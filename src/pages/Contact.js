import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { contact } from '../data/siteData';
import { createWhatsAppLink } from '../utils/whatsapp';

const Contact = () => {
    const generalInquiryLink = createWhatsAppLink(
        contact.whatsappNumber,
        'Hello, I’d like to ask about music lessons at Prime Music Academy.'
    );

    return (
        <div className="page-container">
            <Header />
            <main id="main-content" className="contact-page">
                <header className="page-header">
                    <p className="eyebrow">We’re happy to help</p>
                    <h1>Contact Prime Music Academy</h1>
                    <p>Ask about courses, lesson availability, or whether home visits are available in your area.</p>
                </header>

                <div className="contact-wrapper">
                    <section className="contact-info" aria-label="Contact details">
                        <article className="info-card">
                            <h2>Location</h2>
                            <p>{contact.location}</p>
                        </article>
                        <article className="info-card">
                            <h2>Phone</h2>
                            <a href={contact.phoneHref}>{contact.phone}</a>
                        </article>
                    </section>

                    <section className="contact-cta" aria-labelledby="whatsapp-heading">
                        <p className="eyebrow">Quickest way to get in touch</p>
                        <h2 id="whatsapp-heading">Chat with the instructor on WhatsApp</h2>
                        <p>
                            Your WhatsApp chat opens with a short message ready. Add your questions,
                            review it, and send it when you’re ready.
                        </p>
                        <Button
                            href={generalInquiryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                        >
                            Open WhatsApp
                        </Button>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
