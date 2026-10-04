import React, { useEffect, useRef, useState } from 'react';
import supabase from '../lib/supabaseClient';
import '../styles/student-feedback.css';

const MAX_VISIBLE_REVIEWS = 12;

const insertReview = (reviews, review) => (
    [review, ...reviews.filter(existing => existing.id !== review.id)]
        .sort((first, second) => new Date(second.created_at) - new Date(first.created_at))
        .slice(0, MAX_VISIBLE_REVIEWS)
);

const formatReviewDate = date => new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}).format(new Date(date));

const StudentFeedback = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(Boolean(supabase));
    const [loadError, setLoadError] = useState('');
    const [realtimeAvailable, setRealtimeAvailable] = useState(Boolean(supabase));
    const [rating, setRating] = useState(0);
    const [displayName, setDisplayName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [hasConsent, setHasConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const reviewDialogRef = useRef(null);

    useEffect(() => {
        if (!supabase) {
            return undefined;
        }

        let isMounted = true;
        const channel = supabase
            .channel('student-reviews-live')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'student_reviews' },
                ({ new: review }) => {
                    if (isMounted) {
                        setReviews(currentReviews => insertReview(currentReviews, review));
                    }
                }
            )
            .subscribe(status => {
                if (isMounted) {
                    setRealtimeAvailable(status === 'SUBSCRIBED');
                }
            });

        const loadReviews = async () => {
            const { data, error } = await supabase
                .from('student_reviews')
                .select('id, display_name, rating, review, created_at')
                .order('created_at', { ascending: false })
                .limit(MAX_VISIBLE_REVIEWS);

            if (!isMounted) {
                return;
            }

            setIsLoading(false);

            if (error) {
                setLoadError('Reviews could not be loaded right now. Please try again later.');
                console.error('Unable to load student reviews:', error.message);
                return;
            }

            setReviews(currentReviews => (
                [...(data || []), ...currentReviews]
                    .reduce((uniqueReviews, review) => (
                        uniqueReviews.some(existing => existing.id === review.id)
                            ? uniqueReviews
                            : [...uniqueReviews, review]
                    ), [])
                    .sort((first, second) => new Date(second.created_at) - new Date(first.created_at))
                    .slice(0, MAX_VISIBLE_REVIEWS)
            ));
        };

        loadReviews();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        const dialog = reviewDialogRef.current;

        if (isReviewDialogOpen && dialog && !dialog.open) {
            dialog.showModal();
        } else if (!isReviewDialogOpen && dialog && dialog.open) {
            dialog.close();
        }
    }, [isReviewDialogOpen]);

    const handleSubmit = async event => {
        event.preventDefault();
        setFormError('');
        setFormMessage('');

        if (!supabase) {
            setFormError('Reviews are not connected yet. Please try again later.');
            return;
        }

        if (!rating) {
            setFormError('Choose a star rating before submitting.');
            return;
        }

        if (!hasConsent) {
            setFormError('Please confirm that you agree to publish this review publicly.');
            return;
        }

        setIsSubmitting(true);
        const reviewToSubmit = {
            display_name: displayName.trim() || null,
            rating,
            review: reviewText.trim(),
            consent_to_publish: true
        };
        const { data, error } = await supabase
            .from('student_reviews')
            .insert(reviewToSubmit)
            .select('id, display_name, rating, review, created_at')
            .single();

        setIsSubmitting(false);

        if (error) {
            setFormError('Your review could not be submitted. Please try again in a moment.');
            console.error('Unable to submit student review:', error.message);
            return;
        }

        setReviews(currentReviews => insertReview(currentReviews, data));
        setRating(0);
        setDisplayName('');
        setReviewText('');
        setHasConsent(false);
        setFormMessage('Thank you. Your review is now published and visible to visitors.');
    };

    return (
        <section className="student-feedback" aria-labelledby="student-feedback-heading">
            <div className="student-feedback-inner">
                <header className="student-feedback-heading">
                    <p className="eyebrow">Student feedback</p>
                    <h2 id="student-feedback-heading">Experiences from our music students</h2>
                    <p>
                        Reviews are published immediately. Please share only feedback you consent
                        to make public, and don’t include private information.
                    </p>
                </header>

                {!supabase && (
                    <p className="student-feedback-notice" role="status">
                        Student reviews will be available once the academy review service is connected.
                    </p>
                )}

                {supabase && (
                    <>
                        {loadError && <p className="student-feedback-error" role="alert">{loadError}</p>}
                        {!loadError && isLoading && (
                            <p className="student-feedback-notice" role="status">Loading student reviews…</p>
                        )}
                        {!loadError && !isLoading && reviews.length === 0 && (
                            <p className="student-feedback-notice">Be the first to share your experience.</p>
                        )}
                        {!realtimeAvailable && !isLoading && (
                            <p className="student-feedback-notice" role="status">
                                Live updates are temporarily unavailable. Refresh to see the latest reviews.
                            </p>
                        )}

                        {reviews.length > 0 && (
                            <div className="student-feedback-grid" aria-live="polite">
                                {reviews.map(review => (
                                    <article className="student-feedback-card" key={review.id}>
                                        <div
                                            className="student-feedback-rating"
                                            aria-label={`${review.rating} out of 5 stars`}
                                        >
                                            {'★'.repeat(review.rating)}
                                            <span aria-hidden="true">{'☆'.repeat(5 - review.rating)}</span>
                                        </div>
                                        <p>{review.review}</p>
                                        <footer className="student-feedback-attribution">
                                            <span>{review.display_name || 'Student'}</span>
                                            <time dateTime={review.created_at}>
                                                {formatReviewDate(review.created_at)}
                                            </time>
                                        </footer>
                                    </article>
                                ))}
                            </div>
                        )}

                        <div className="student-feedback-actions">
                            <p>Have you taken lessons with us? Share your experience with future students.</p>
                            <button
                                className="btn btn-primary student-feedback-open"
                                type="button"
                                onClick={() => setIsReviewDialogOpen(true)}
                            >
                                Review
                            </button>
                        </div>

                        <dialog
                            ref={reviewDialogRef}
                            className="student-feedback-dialog"
                            aria-labelledby="student-feedback-form-heading"
                            onClose={() => setIsReviewDialogOpen(false)}
                            onKeyDown={event => {
                                if (event.key === 'Escape') {
                                    event.preventDefault();
                                    event.currentTarget.close();
                                }
                            }}
                            onClick={event => {
                                if (event.target === event.currentTarget) {
                                    event.currentTarget.close();
                                }
                            }}
                        >
                            <div className="student-feedback-dialog-content">
                                <div className="student-feedback-dialog-heading">
                                    <div>
                                        <p className="eyebrow">Student feedback</p>
                                        <h3 id="student-feedback-form-heading">Share your experience</h3>
                                    </div>
                                    <button
                                        className="student-feedback-dialog-close"
                                        type="button"
                                        aria-label="Close review form"
                                        onClick={() => reviewDialogRef.current.close()}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <p className="student-feedback-form-intro">
                                    Your review appears publicly as soon as you submit it. A display name is optional.
                                </p>

                                <form className="student-feedback-form" onSubmit={handleSubmit}>
                                    <fieldset className="student-feedback-rating-input">
                                        <legend>Your rating</legend>
                                        <div className="student-feedback-stars">
                                            {[1, 2, 3, 4, 5].map(value => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    className={value <= rating ? 'selected' : ''}
                                                    aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
                                                    aria-pressed={rating === value}
                                                    onClick={() => setRating(value)}
                                                >
                                                    {value <= rating ? '★' : '☆'}
                                                </button>
                                            ))}
                                        </div>
                                    </fieldset>

                                    <label htmlFor="student-feedback-name">Display name <span>(optional)</span></label>
                                    <input
                                        id="student-feedback-name"
                                        name="displayName"
                                        type="text"
                                        autoComplete="nickname"
                                        maxLength={40}
                                        value={displayName}
                                        onChange={event => setDisplayName(event.target.value)}
                                        placeholder="Leave blank to post as Student"
                                    />

                                    <label htmlFor="student-feedback-review">Your review</label>
                                    <textarea
                                        id="student-feedback-review"
                                        name="review"
                                        rows={4}
                                        minLength={15}
                                        maxLength={1000}
                                        required
                                        value={reviewText}
                                        onChange={event => setReviewText(event.target.value)}
                                        placeholder="Tell others about your lesson experience (15–1000 characters)."
                                    />

                                    <label className="student-feedback-consent">
                                        <input
                                            type="checkbox"
                                            checked={hasConsent}
                                            onChange={event => setHasConsent(event.target.checked)}
                                        />
                                        <span>I confirm this is my feedback and agree to publish it publicly.</span>
                                    </label>

                                    {formError && <p className="student-feedback-error" role="alert">{formError}</p>}
                                    {formMessage && <p className="student-feedback-success" role="status">{formMessage}</p>}

                                    <button
                                        className="btn btn-primary student-feedback-submit"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Publishing…' : 'Publish review'}
                                    </button>
                                </form>
                            </div>
                        </dialog>
                    </>
                )}
            </div>
        </section>
    );
};

export default StudentFeedback;
