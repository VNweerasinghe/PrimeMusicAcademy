import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Button from '../components/Button';
import { tutors, courses } from '../data/siteData';
import tutorImage from '../assets/images/tutor.jpg';
import heroImage from '../assets/images/hero.jpg';

const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-container">
            <Header />
            
            <section className="hero">
                <div className="hero-bg-animation"></div>
                <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
                    <div className="hero-text">
                        <div className="animated-heading">
                            <div className="title-container">
                                <h1 className="main-title">
                                    <div className="title-line">
                                        <span className="gradient-text">Discover</span>
                                    </div>
                                    <div className="title-line">
                                        <span className="highlight-text">Your Musical Journey</span>
                                    </div>
                                </h1>
                                <div className="academy-title">
                                    <span className="with-text">with</span>
                                    <div className="brand-wrapper">
                                        <span className="brand-name">Prime Music Academy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="hero-subtitle">Learn from world-class musicians and unleash your potential</p>
                        <Button 
                            href="/courses"
                            variant="primary"
                            size="large"
                            icon="→"
                            iconPosition="right"
                        >
                            Start Learning Today
                        </Button>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-image-wrapper">
                            <img 
                                src={heroImage} 
                                alt="Music Education" 
                                className="hero-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="featured">
                <div className="section-header">
                    <h2>Featured Courses</h2>
                    <p>Master your musical skills with our premium courses</p>
                </div>
                <div className="course-grid">
                    {courses.slice(0, 3).map((course, index) => (
                        <div 
                            className="course-card premium-card" 
                            key={course.id}
                            style={{ 
                                animationDelay: `${index * 0.15}s`
                            }}
                        >
                            <div className="course-header">
                                <span className="course-level-badge">{course.level}</span>
                            </div>
                            <h3>{course.title}</h3>
                            <p className="course-description">{course.description}</p>
                            <div className="course-meta">
                                <span className="duration">⏱️ {course.duration}</span>
                                <span className="price">{course.price}</span>
                            </div>
                            <Button 
                                href="/courses"
                                variant="primary"
                                size="medium"
                                fullWidth
                                icon="→"
                                iconPosition="right"
                            >
                                Explore
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Instructor Section */}
            <section className="tutor-intro premium-section">
                <div className="tutor-intro-content">
                    <div className="tutor-image-container">
                        <div className="image-frame">
                            <img 
                                src={tutorImage} 
                                alt="Mr. Rashmika" 
                                className="tutor-profile-image" 
                            />
                        </div>
                    </div>
                    <div className="tutor-info">
                        <h2>Meet Your Instructor</h2>
                        <div className="tutor-name">Mr. Rashmika</div>
                        <p className="tutor-brief">
                            A 28-year-old Graduate & London-qualified music teacher with 8 years of experience, 
                            providing personalized home visit lessons across Colombo suburbs and leading apartments 
                            for students of all ages.
                        </p>
                        <div className="credentials-grid">
                            <div className="credential-item">
                                <span className="credential-icon">🎓</span>
                                <span>B.A (Hons) in Western Music</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-icon">📚</span>
                                <span>M.Mus (Kelaniya) - Ongoing</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-icon">🏆</span>
                                <span>ATCL (London)</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-icon">🎼</span>
                                <span>ABRSM Grade 8 (London)</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-icon">✨</span>
                                <span>Registered Teacher - IWMS & Trinity College London</span>
                            </div>
                            <div className="credential-item">
                                <span className="credential-icon">📋</span>
                                <span>Registered Teacher - ABRSM London</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ThemeSwitcher />
            <Footer />
        </div>
    );
};

export default Home;