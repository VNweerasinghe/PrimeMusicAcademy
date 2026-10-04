import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/buttons.css';

const Button = ({ 
    children, 
    variant = 'primary',
    size = 'medium',
    disabled = false,
    isLoading = false,
    onClick,
    type = 'button',
    className = '',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    href,
    ...props
}) => {
    const classNames = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled && 'btn-disabled',
        isLoading && 'btn-loading',
        fullWidth && 'btn-full-width',
        className
    ].filter(Boolean).join(' ');

    const buttonContent = (
        <>
            {isLoading ? (
                <span className="btn-loader" aria-hidden="true"></span>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
                    <span className="btn-text">{children}</span>
                    {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
                </>
            )}
        </>
    );

    if (href && href.startsWith('/')) {
        return (
            <Link to={href} className={classNames} {...props}>
                {buttonContent}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classNames} {...props}>
                {buttonContent}
            </a>
        );
    }

    return (
        <button 
            type={type}
            className={classNames}
            onClick={onClick}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
        >
            {buttonContent}
        </button>
    );
};

export default Button;
