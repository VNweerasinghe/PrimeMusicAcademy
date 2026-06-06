import React from 'react';
import { courses } from '../data/siteData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Courses = () => {
    return (
        <div className="page-container">
            <nav className="glass-nav">
                <Header />
            </nav>
            <h1>Music Courses</h1>
            <div className="course-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <p className="course-level">Level: {course.level}</p>
                        <p className="course-duration">Duration: {course.duration}</p>
                        <span className="price">{course.price}</span>
                    </div>
                ))}
            </div>
            <ThemeSwitcher />
            <Footer />
        </div>
    );
};

export default Courses;