import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { instructor } from '../data/siteData';
import tutorImage from '../assets/images/tutor.jpg';

const Tutors = () => (
    <div className="page-container">
        <Header />
        <main id="main-content" className="tutors-page">
            <header className="page-header">
                <p className="eyebrow">About your teacher</p>
                <h1>Meet your instructor</h1>
                <p>Experienced, qualified music tuition with a personal approach.</p>
            </header>
            <article className="instructor-profile">
                <img
                    src={tutorImage}
                    alt="Music instructor Mr. Rashmika"
                    width="947"
                    height="960"
                    decoding="async"
                    className="tutor-card-image"
                />
                <div className="instructor-profile-content">
                    <p className="eyebrow">Personalized music tuition in Colombo</p>
                    <h2>{instructor.name}</h2>
                    <p>{instructor.bio}</p>
                    <h3>Qualifications and registrations</h3>
                    <ul className="credentials-list">
                        {instructor.credentials.map(credential => (
                            <li key={credential}>{credential}</li>
                        ))}
                    </ul>
                    <Button href="/schedule" variant="primary">Request a lesson</Button>
                </div>
            </article>
        </main>
        <Footer />
    </div>
);

export default Tutors;
