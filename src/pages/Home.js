import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import HeroCarousel from '../components/HeroCarousel';
import { contact, instructor } from '../data/siteData';
import tutorImage from '../assets/images/tutor.jpg';
import { createWhatsAppLink } from '../utils/whatsapp';

const recommendationLink = createWhatsAppLink(
    contact.whatsappNumber,
    'Hello, I’d appreciate a recommendation on which music course and lesson length might suit my experience and goals.'
);

const Home = () => (
    <div className="home-container">
        <Header />

        <main id="main-content">
            <section className="hero"> 
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="eyebrow">Music tuition in Colombo</p>
                        <h1>Build Confidence Through Music</h1>
                        <p className="hero-subtitle">
                            Personal, one-to-one music lessons for learners of all ages, taught at home across Colombo suburbs.
                        </p>
                        <div className="hero-actions">
                            <Button href="/schedule" variant="primary" size="large">Request a lesson</Button>
                            <Button href="/courses" variant="secondary" size="large">Explore courses</Button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <HeroCarousel />
                    </div>
                </div>
            </section>

            <section className="service-highlights" aria-label="Lesson information">
                <article>
                    <h2>One-to-one teaching</h2>
                    <p>Friendly, personal support shaped around each learner’s goals and pace.</p>
                </article>
                <article>
                    <h2>Lessons at home</h2>
                    <p>Home visits are available across Colombo suburbs and leading apartments.</p>
                </article>
                <article>
                    <h2>For all ages</h2>
                    <p>Personalized tuition for students at different stages of learning.</p>
                </article>
            </section>

            <section className="faq-section" aria-labelledby="faq-heading">
                <div className="faq-heading">
                    <p className="eyebrow">Good to know</p>
                    <h2 id="faq-heading">A few things students often ask</h2>
                </div>
                <div className="faq-list">
                    <details>
                        <summary>How long are the lessons?</summary>
                        <p>Choose a 45-minute, 1-hour, or 2-hour lesson when you send a request. The instructor will confirm the arrangement with you.</p>
                    </details>
                    <details>
                        <summary>What is the teaching approach like?</summary>
                        <p>The instructor offers friendly, personalized guidance and adapts lessons to the student’s age, experience, and learning goals.</p>
                    </details>
                    <details>
                        <summary>Can I get help choosing a course?</summary>
                        <p>Yes. Share your musical experience and goals on WhatsApp and ask the instructor for a course recommendation.</p>
                        <a className="text-link" href={recommendationLink} target="_blank" rel="noopener noreferrer">
                            Ask for a recommendation <span aria-hidden="true">→</span>
                        </a>
                    </details>
                    <details>
                        <summary>Where are home visits available?</summary>
                        <p>Home visits are available across Colombo suburbs and leading apartments. Ask on WhatsApp whether your area is covered.</p>
                    </details>
                </div>
            </section>

            <section className="tutor-intro" aria-labelledby="instructor-heading">
                <div className="tutor-intro-content">
                    <div className="tutor-image-container">
                        <img
                            src={tutorImage}
                            alt="Music instructor Mr. Rashmika"
                            width="947"
                            height="960"
                            decoding="async"
                            className="tutor-profile-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="tutor-info">
                        <p className="eyebrow">Your instructor</p>
                        <h2 id="instructor-heading">{instructor.name}</h2>
                        <p className="tutor-brief">{instructor.bio}</p>
                        <ul className="credentials-list">
                            {instructor.credentials.map(credential => (
                                <li key={credential}>{credential}</li>
                            ))}
                        </ul>
                        <Button href="/tutors" variant="secondary">View instructor profile</Button>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
);

export default Home;
