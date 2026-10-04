import React from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../data/siteData';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Prime Music Academy</h3>
          <p>Personalized music tuition in Colombo.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/tutors">Instructor</Link></li>
            <li><Link to="/schedule">Request a lesson</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 {contact.location}</p>
          <p className="contact-row">
            <a href={contact.phoneHref}>{contact.phone}</a>
          </p>
          <p><a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Prime Music Academy.</p>
      </div>
    </footer>
  );
};

export default Footer;