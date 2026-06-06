import React, { useState } from 'react';

const LessonScheduler = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to schedule the lesson goes here
        alert(`Lesson scheduled on ${selectedDate} at ${selectedTime}`);
    };

    return (
        <div className="lesson-scheduler">
            <h2>Schedule a Lesson</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Date:
                    <input type="date" value={selectedDate} onChange={handleDateChange} required />
                </label>
                <label>
                    Select Time:
                    <input type="time" value={selectedTime} onChange={handleTimeChange} required />
                </label>
                <button type="submit">Schedule Lesson</button>
            </form>
        </div>
    );
};

export default LessonScheduler;