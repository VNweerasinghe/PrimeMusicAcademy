export const createWhatsAppLink = (phoneNumber, message) => {
    const normalizedNumber = phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
};
