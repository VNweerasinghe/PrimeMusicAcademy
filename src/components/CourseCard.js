import React from 'react';

const CourseCard = ({ title, description, price }) => {
    return (
        <div className="course-card">
            <h3>{title || 'Course Title'}</h3>
            <p>{description || 'Course description'}</p>
            <span className="price">{price || '$99'}</span>
        </div>
    );
};

export default CourseCard;