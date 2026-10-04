import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contact, courses, lessonDurations } from '../data/siteData';
import { createWhatsAppLink } from '../utils/whatsapp';
import Button from './Button';

const getToday = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
};

const LessonScheduler = () => {
    const location = useLocation();
    const requestedCourseId = new URLSearchParams(location.search).get('course');
    const initialCourse = courses.find(course => String(course.id) === requestedCourseId);
    const [request, setRequest] = useState({
        name: '',
        course: initialCourse ? initialCourse.title : '',
        duration: '',
        date: '',
        time: '',
        area: '',
        goals: ''
    });
    const [formError, setFormError] = useState('');
    const [requestOpened, setRequestOpened] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRequest(previous => ({ ...previous, [name]: value }));
        setFormError('');
        setRequestOpened(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = request.name.trim();

        if (name.length < 2) {
            setFormError('Please enter the student’s name.');
            return;
        }

        const message = [
            'Hello, I’d like to ask about music lessons.',
            '',
            `Name: ${name}`,
            `Course: ${request.course}`,
            `Preferred lesson length: ${request.duration}`,
            `Preferred date: ${request.date}`,
            `Preferred time: ${request.time}`,
            `Area: ${request.area.trim() || 'Not provided'}`,
            `Goals or questions: ${request.goals.trim() || 'Not provided'}`,
            '',
            'I understand the requested date and time need to be confirmed.'
        ].join('\n');
        const whatsappLink = createWhatsAppLink(contact.whatsappNumber, message);
        const whatsappWindow = window.open(whatsappLink, '_blank');

        if (whatsappWindow) {
            whatsappWindow.opener = null;
            setRequestOpened(true);
        } else {
            window.location.assign(whatsappLink);
        }
    };

    return (
        <section className="lesson-scheduler" aria-labelledby="schedule-form-heading">
            <h2 id="schedule-form-heading">Request a lesson</h2>
            <p>Your request opens in WhatsApp for you to review and send. A lesson is not confirmed until the instructor replies.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="student-name">Student name</label>
                <input
                    id="student-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={request.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                />

                <label htmlFor="course">Course</label>
                <select
                    id="course"
                    name="course"
                    value={request.course}
                    onChange={handleChange}
                    required
                >
                    <option value="">Choose a course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                    ))}
                </select>

                <label htmlFor="lesson-duration">Preferred lesson length</label>
                <select
                    id="lesson-duration"
                    name="duration"
                    value={request.duration}
                    onChange={handleChange}
                    required
                >
                    <option value="">Choose a lesson length</option>
                    {lessonDurations.map(duration => (
                        <option key={duration.value} value={duration.value}>{duration.label}</option>
                    ))}
                </select>

                <div className="schedule-fields">
                    <div>
                        <label htmlFor="preferred-date">Preferred date</label>
                        <input
                            id="preferred-date"
                            name="date"
                            type="date"
                            min={getToday()}
                            value={request.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="preferred-time">Preferred time</label>
                        <input
                            id="preferred-time"
                            name="time"
                            type="time"
                            value={request.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <label htmlFor="student-area">Your area in Colombo <span>(optional)</span></label>
                <input
                    id="student-area"
                    name="area"
                    type="text"
                    autoComplete="address-level2"
                    maxLength={100}
                    value={request.area}
                    onChange={handleChange}
                />

                <label htmlFor="lesson-goals">Goals or questions <span>(optional)</span></label>
                <textarea
                    id="lesson-goals"
                    name="goals"
                    rows={3}
                    maxLength={500}
                    placeholder="Share your experience or what you hope to learn."
                    value={request.goals}
                    onChange={handleChange}
                />

                {formError && <p className="form-error-message" role="alert">{formError}</p>}
                <Button type="submit" variant="primary" fullWidth>
                    Continue to WhatsApp
                </Button>
            </form>
            {requestOpened && (
                <p className="form-help" role="status">
                    WhatsApp opened in a new tab. Review your message there and tap Send.
                </p>
            )}
        </section>
    );
};

export default LessonScheduler;
