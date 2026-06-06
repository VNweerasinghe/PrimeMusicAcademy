import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Prime Music Academy</h3>
          <p>Inspiring musicians since 2024</p>
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" title="Visit our Facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" className="social-link" title="Visit our Instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com" className="social-link" title="Visit our YouTube" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#tutors">Tutors</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 Colombo, Sri Lanka</p>
          <p className="contact-row">
            <span className="contact-icons">
              📞 <span className="whatsapp-icon">💬</span>
            </span>
            <a href="tel:+94773780121" title="Call us">+94 77 378 0121</a>
          </p>
          <p>✉️ <a href="mailto:info@primemusic.com" title="Email us">info@primemusic.com</a></p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Prime Music Academy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;