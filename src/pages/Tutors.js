import React from 'react';
import TutorCard from '../components/TutorCard';
import { tutors } from '../data/siteData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Tutors = () => {
    return (
        <div className="page-container">
            <nav className="glass-nav">
                <Header />
            </nav>
            <h1>Our Tutors</h1>
            <div className="tutor-list">
                {tutors.map(tutor => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
            <ThemeSwitcher />
            <Footer />
        </div>
    );
};

export default Tutors;