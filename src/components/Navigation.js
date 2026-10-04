import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    // Navigation items configuration
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/tutors', label: 'Tutors' },
        { path: '/courses', label: 'Courses' },
        { path: '/schedule', label: 'Schedule' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <nav className="navbar" aria-label="Main navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo" aria-label="Prime Music Academy">
                    <span className="logo-icon">♪</span>
                    <span className="logo-text">Prime Music</span>
                </Link>

                <ul id="primary-navigation" className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path} className="nav-item">
                            <Link 
                                to={item.path} 
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                aria-current={location.pathname === item.path ? 'page' : undefined}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="nav-actions">
                    <button
                        className="theme-toggle"
                        type="button"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                        aria-pressed={theme === 'dark'}
                        onClick={() => setTheme(current => current === 'light' ? 'dark' : 'light')}
                    >
                        <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
                        <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
                    </button>
                    <button
                        className={`nav-toggle ${isOpen ? 'active' : ''}`}
                        onClick={() => setIsOpen(open => !open)}
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isOpen}
                        aria-controls="primary-navigation"
                        type="button"
                    >
                        <span className="hamburger" aria-hidden="true"></span>
                        <span className="hamburger" aria-hidden="true"></span>
                        <span className="hamburger" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navigation;