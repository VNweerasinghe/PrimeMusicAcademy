import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => (
    <div className="page-container">
        <Header />
        <main id="main-content" className="not-found-page">
            <p className="eyebrow">Page not found</p>
            <h1>We couldn’t find that page.</h1>
            <p>The address may have changed. Return to the home page or browse the course options.</p>
            <div className="hero-actions">
                <Link className="btn btn-primary btn-medium" to="/">Go to home</Link>
                <Link className="btn btn-secondary btn-medium" to="/courses">Explore courses</Link>
            </div>
        </main>
        <Footer />
    </div>
);

export default NotFound;
