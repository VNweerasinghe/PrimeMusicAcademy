import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import LessonScheduler from '../components/LessonScheduler';

const Schedule = () => {
    return (
        <div className="page-container">
            <nav className="glass-nav">
                <Header />
            </nav>
            <div className="schedule-page">
                <h1>Available Lesson Times</h1>
                <p>Schedule your music lessons at a time that works best for you.</p>
                <LessonScheduler />
            </div>
            <ThemeSwitcher />
            <Footer />
        </div>
    );
};

export default Schedule;