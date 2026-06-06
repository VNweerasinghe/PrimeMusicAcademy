import React, { useState } from 'react';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [preferredTime, setPreferredTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Booking details:', { name, email, preferredTime });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book a Lesson</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="preferredTime">Preferred Lesson Time:</label>
                <input
                    type="text"
                    id="preferredTime"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit Booking</button>
        </form>
    );
};

export default BookingForm;