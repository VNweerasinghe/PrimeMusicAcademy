import React, { useState, useCallback, useMemo } from 'react';
import '../styles/forms.css';

const FormTextarea = ({ 
    label, 
    name, 
    value, 
    onChange, 
    onBlur,
    error, 
    placeholder,
    required,
    rows = 5,
    ariaLabel,
    maxLength = 1000
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const charCount = useMemo(() => value?.length || 0, [value]);

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
            <div className="form-textarea-wrapper">
                <textarea 
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlurEvent}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    maxLength={maxLength}
                    aria-label={ariaLabel || label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : `${name}-count`}
                    className={`form-textarea ${error ? 'error' : ''} ${isFocused ? 'focused' : ''}`}
                />
                {error && <span className="form-error-icon">⚠</span>}
            </div>
            <div className="form-meta">
                {error && (
                    <span id={`${name}-error`} className="form-error-message" role="alert">
                        {error}
                    </span>
                )}
                <span id={`${name}-count`} className="char-count">
                    {charCount}/{maxLength}
                </span>
            </div>
        </div>
    );
};

export default FormTextarea;
