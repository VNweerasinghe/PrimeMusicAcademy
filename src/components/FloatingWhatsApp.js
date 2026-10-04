import React from 'react';
import { contact } from '../data/siteData';
import { createWhatsAppLink } from '../utils/whatsapp';

const message = 'Hello, I’d like to ask about music lessons at Prime Music Academy.';
const whatsappLink = createWhatsAppLink(contact.whatsappNumber, message);

const FloatingWhatsApp = () => (
    <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Prime Music Academy on WhatsApp"
        title="Chat with Prime Music Academy on WhatsApp"
    >
        <svg className="floating-whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M20.4 11.7a8.3 8.3 0 0 1-12.3 7.2L3 20l1.2-4.9a8.3 8.3 0 1 1 16.2-3.4Z" />
            <path d="M8.8 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.4-.5.4-1.1.6-1.8.5-1-.1-2.3-.6-3.8-1.9-1.2-1-2-2.3-2.3-3.2-.3-.9-.1-1.8.2-2.3.2-.4.5-.6.7-.7Z" />
        </svg>
        <span className="floating-whatsapp-label">WhatsApp</span>
    </a>
);

export default FloatingWhatsApp;
