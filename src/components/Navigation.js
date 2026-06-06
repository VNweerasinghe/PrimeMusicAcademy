import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Handle scroll detection with debouncing
    useEffect(() => {
        let scrollTimer;
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            
            // Clear previous timer
            if (scrollTimer) clearTimeout(scrollTimer);
            
            // Set new timer to debounce
            scrollTimer = setTimeout(() => {
                setIsScrolled(window.scrollY > 20);
            }, 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimer) clearTimeout(scrollTimer);
        };
    }, []);

    // Navigation items configuration
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/tutors', label: 'Tutors' },
        { path: '/courses', label: 'Courses' },
        { path: '/schedule', label: 'Schedule' },
        { path: '/contact', label: 'Contact' }
    ];

    // Memoized active check
    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo" aria-label="Prime Music Academy">
                    <span className="logo-icon">♪</span>
                    <span className="logo-text">Prime Music</span>
                </Link>

                <button 
                    className={`nav-toggle ${isOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <span className="hamburger"></span>
                </button>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path} className="nav-item">
                            <Link 
                                to={item.path} 
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;