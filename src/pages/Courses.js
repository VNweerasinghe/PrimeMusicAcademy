import React from 'react';
import { Link } from 'react-router-dom';
import { contact, courses } from '../data/siteData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createWhatsAppLink } from '../utils/whatsapp';

const courseRecommendationLink = createWhatsAppLink(
    contact.whatsappNumber,
    'Hello, I’d like a recommendation on which music course might suit my experience and goals.'
);

const Courses = () => (
    <div className="page-container">
        <Header />
        <main id="main-content" className="courses-page">
            <header className="page-header">
                <p className="eyebrow">Learning options</p>
                <h1>Music courses</h1>
                <p>Explore the current course outlines. Get in touch to discuss lesson availability and fees.</p>
            </header>
            <div className="course-grid">
                {courses.map(course => (
                    <article key={course.id} className="course-card">
                        <span className="course-level-badge">{course.level}</span>
                        <p className="course-instrument">{course.instrument}</p>
                        <h2>{course.title}</h2>
                        <p className="course-description">{course.description}</p>
                        <Link className="text-link" to={`/schedule?course=${course.id}`}>
                            Ask about this course <span aria-hidden="true">→</span>
                        </Link>
                    </article>
                ))}
            </div>
            <p className="pricing-note">Fees and available times are confirmed directly with the instructor.</p>
            <section className="course-recommendation" aria-labelledby="course-recommendation-heading">
                <div>
                    <p className="eyebrow">Need help choosing?</p>
                    <h2 id="course-recommendation-heading">Get a personal recommendation</h2>
                    <p>Share your experience and musical goals in WhatsApp, and ask the instructor which course may suit you.</p>
                </div>
                <a
                    className="btn btn-secondary btn-medium"
                    href={courseRecommendationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ask on WhatsApp
                </a>
            </section>
        </main>
        <Footer />
    </div>
);

export default Courses;
