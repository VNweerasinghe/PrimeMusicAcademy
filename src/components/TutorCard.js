import React from 'react';

const TutorCard = ({ tutor }) => {
    const specialties = Array.isArray(tutor.specialties) ? tutor.specialties : [tutor.specialties];
    
    return (
        <div className="tutor-card">
            {tutor.image && (
                <img src={tutor.image} alt={tutor.name} className="tutor-card-image" />
            )}
            <h3>{tutor.name}</h3>
            <p className="tutor-instrument"><strong>{tutor.instrument || 'Music'}</strong></p>
            <p className="tutor-experience">Experience: {tutor.experience}</p>
            <p><strong>Specialties:</strong> {specialties.join(', ')}</p>
            <p className="tutor-bio">{tutor.bio}</p>
        </div>
    );
};

export default TutorCard;