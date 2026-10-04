import { createWhatsAppLink } from '../src/utils/whatsapp';

describe('createWhatsAppLink', () => {
    it('normalizes the WhatsApp number and encodes a prefilled request', () => {
        const link = createWhatsAppLink(
            '+94 77 378 0121',
            'Hello, I’d like a 1-hour piano lesson.'
        );
        const parsedLink = new URL(link);

        expect(parsedLink.origin).toBe('https://wa.me');
        expect(parsedLink.pathname).toBe('/94773780121');
        expect(parsedLink.searchParams.get('text')).toBe('Hello, I’d like a 1-hour piano lesson.');
    });

    it('preserves punctuation and line breaks in the message', () => {
        const link = createWhatsAppLink('94773780121', 'Course: Piano\nArea: Colombo 05');
        const parsedLink = new URL(link);

        expect(parsedLink.searchParams.get('text')).toBe('Course: Piano\nArea: Colombo 05');
    });
});
