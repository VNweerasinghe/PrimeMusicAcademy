import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import '../styles/pages.css';

// Validation patterns
const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
};

// Validation rules for each field
const FIELD_RULES = {
    name: {
        required: 'Name is required',
        minLength: { value: 2, message: 'Name must be at least 2 characters' }
    },
    email: {
        required: 'Email is required',
        pattern: { value: PATTERNS.email, message: 'Please enter a valid email address' }
    },
    phone: {
        pattern: { value: PATTERNS.phone, message: 'Please enter a valid phone number', optional: true }
    },
    subject: {
        required: 'Subject is required',
        minLength: { value: 5, message: 'Subject must be at least 5 characters' }
    },
    message: {
        required: 'Message is required',
        minLength: { value: 10, message: 'Message must be at least 10 characters' }
    }
};

const Contact = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        subject: '',
        message: '' 
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState({});

    const validateEmail = (email) => PATTERNS.email.test(email);

    const validatePhone = (phone) => {
        if (!phone.trim()) return true; // Optional field
        return PATTERNS.phone.test(phone.replace(/\s/g, ''));
    };

    const validateField = (fieldName, value = null) => {
        const rules = FIELD_RULES[fieldName];
        const fieldValue = value !== null ? value : formData[fieldName];
        
        if (!rules) return '';

        // Check required
        if (rules.required && !fieldValue.trim()) {
            return rules.required;
        }

        // Check minLength
        if (rules.minLength && fieldValue.trim().length < rules.minLength.value) {
            return rules.minLength.message;
        }

        // Check pattern
        if (rules.pattern) {
            if (rules.pattern.optional && !fieldValue.trim()) return '';
            if (!rules.pattern.value.test(fieldValue.replace(/\s/g, ''))) {
                return rules.pattern.message;
            }
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        
        Object.keys(FIELD_RULES).forEach(fieldName => {
            const error = validateField(fieldName);
            if (error) newErrors[fieldName] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error on input if field was touched
        if (touched[name] && errors[name]) {
            const error = validateField(name, value);
            if (!error) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        const error = validateField(name);
        setErrors(prev => {
            if (error) {
                return { ...prev, [name]: error };
            } else {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Log form data (replace with actual API call)
            console.log('Contact form submitted:', formData);
            
            // Reset form
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setErrors({});
            setTouched({});
            setSubmitted(true);
            
            // Hide success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Header />
            
            <main className="contact-page">
                <div className="page-header">
                    <h1>Get in Touch</h1>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="info-card">
                            <span className="info-icon">📍</span>
                            <h3>Location</h3>
                            <p>Colombo, Sri Lanka</p>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">📞</span>
                            <h3>Phone</h3>
                            <a href="tel:+94773780121">+94 77 378 0121</a>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">✉️</span>
                            <h3>Email</h3>
                            <a href="mailto:info@primemusic.com">info@primemusic.com</a>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">💬</span>
                            <h3>WhatsApp</h3>
                            <a href="https://wa.me/94773780121" target="_blank" rel="noopener noreferrer">Message us</a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={`contact-form ${isLoading ? 'form-loading' : ''}`} noValidate>
                        {submitted && (
                            <div className="form-success" role="alert">
                                <span className="message-icon">✓</span>
                                <div>
                                    <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                                </div>
                            </div>
                        )}

                        <FormInput 
                            label="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name ? errors.name : ''}
                            placeholder="John Doe"
                            required
                            aria-label="Your full name"
                        />

                        <FormInput 
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email ? errors.email : ''}
                            placeholder="your@email.com"
                            required
                            aria-label="Your email address"
                        />

                        <FormInput 
                            label="Phone Number (Optional)"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone ? errors.phone : ''}
                            placeholder="+94 77 378 0121"
                            aria-label="Your phone number"
                        />

                        <FormInput 
                            label="Subject"
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.subject ? errors.subject : ''}
                            placeholder="How can we help?"
                            required
                            aria-label="Subject of your message"
                        />

                        <FormTextarea 
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.message ? errors.message : ''}
                            placeholder="Tell us more about your inquiry..."
                            required
                            rows={6}
                            maxLength={1000}
                            aria-label="Your message"
                        />

                        <Button 
                            type="submit"
                            variant="primary"
                            size="medium"
                            fullWidth
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </div>
            </main>

            <ThemeSwitcher />
            <Footer />
        </div>
    );
};

export default Contact;