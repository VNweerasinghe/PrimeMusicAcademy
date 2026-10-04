import React, { useEffect, useState } from 'react';
import '../styles/hero-carousel.css';
import fluteLesson from '../assets/carousell/img1.jpg';
import pianoLesson from '../assets/carousell/img2.jpg';
import violinLesson from '../assets/carousell/img3.jpg';
import musicLesson from '../assets/carousell/img4.jpg';
import pianoCoaching from '../assets/carousell/img5.jpg';

const slides = [
    { src: fluteLesson, alt: 'A student learning flute during a one-to-one lesson' },
    { src: pianoLesson, alt: 'A student practicing piano with a music teacher' },
    { src: violinLesson, alt: 'A student learning violin with guidance from an instructor' },
    { src: musicLesson, alt: 'A music student receiving individual instruction' },
    { src: pianoCoaching, alt: 'A student receiving piano coaching' }
];

const prefersReducedMotion = () => (
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

const HeroCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());

    useEffect(() => {
        if (!isPlaying) {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            setActiveIndex(index => (index + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [isPlaying]);

    const showSlide = index => {
        setActiveIndex((index + slides.length) % slides.length);
    };

    return (
        <div
            className="hero-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Music lessons at Prime Music Academy"
        >
            <div className="hero-image-wrapper">
                <img
                    key={activeIndex}
                    id="hero-carousel-slide"
                    className="hero-image hero-carousel-image"
                    src={slides[activeIndex].src}
                    alt={slides[activeIndex].alt}
                    decoding="async"
                />
                <div className="hero-carousel-controls">
                    <button
                        className="hero-carousel-arrow"
                        type="button"
                        aria-label="Show previous image"
                        aria-controls="hero-carousel-slide"
                        onClick={() => showSlide(activeIndex - 1)}
                    >
                        <span aria-hidden="true">‹</span>
                    </button>
                    <button
                        className="hero-carousel-arrow"
                        type="button"
                        aria-label="Show next image"
                        aria-controls="hero-carousel-slide"
                        onClick={() => showSlide(activeIndex + 1)}
                    >
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
                <div className="hero-carousel-footer">
                    <div className="hero-carousel-indicators" aria-label="Choose an image">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.src}
                                className={`hero-carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                                type="button"
                                aria-label={`Show image ${index + 1} of ${slides.length}`}
                                aria-current={index === activeIndex ? 'true' : undefined}
                                aria-controls="hero-carousel-slide"
                                onClick={() => showSlide(index)}
                            />
                        ))}
                    </div>
                    <button
                        className="hero-carousel-play"
                        type="button"
                        aria-label={isPlaying ? 'Pause automatic image rotation' : 'Start automatic image rotation'}
                        aria-pressed={!isPlaying}
                        onClick={() => setIsPlaying(playing => !playing)}
                    >
                        <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
