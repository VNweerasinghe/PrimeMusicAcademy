import React, { useState, useCallback } from 'react';
import '../styles/forms.css';

const FormInput = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    onBlur,
    error, 
    placeholder,
    required,
    ariaLabel
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlurEvent = useCallback((e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    }, [onBlur]);

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <div className="form-input-wrapper">
                <input 
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlurEvent}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    required={required}
                    aria-label={ariaLabel || label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={`form-input ${error ? 'error' : ''} ${isFocused ? 'focused' : ''}`}
                />
                {error && <span className="form-error-icon">⚠</span>}
            </div>
            {error && (
                <span id={`${name}-error`} className="form-error-message" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default FormInput;
