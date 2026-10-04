import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LessonScheduler from '../components/LessonScheduler';

const Schedule = () => (
    <div className="page-container">
        <Header />
        <main id="main-content" className="schedule-page">
            <header className="page-header">
                <p className="eyebrow">Start learning</p>
                <h1>Request a lesson</h1>
                <p>Choose a course, lesson length, and preferred time. Your request opens in WhatsApp for the instructor to review and confirm.</p>
            </header>
            <LessonScheduler />
        </main>
        <Footer />
    </div>
);

export default Schedule;
