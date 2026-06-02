import React, { useState, useEffect } from 'react';

const images = [
    "https://makerbazar.in/cdn/shop/files/WhatsApp_Image_2025-10-24_at_20.38.07.jpg?v=1761471358&width=1500",
    "https://makerbazar.in/cdn/shop/files/Web_Banner_Maker.jpg?v=1722621420&width=2000",
    "https://makerbazar.in/cdn/shop/files/banner.jpg?v=1763288112&width=2000",
    "https://makerbazar.in/cdn/shop/files/MakerBazar_Customer_Care.jpg?v=1735030421&width=2000",
    "https://makerbazar.in/cdn/shop/files/offer.jpg?v=1685608547&width=1800"
];

const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showSlide = (index) => {
        if (index < 0) {
            setCurrentIndex(images.length - 1);
        } else if (index >= images.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(index);
        }
    };

    const nextSlide = () => {
        showSlide(currentIndex + 1);
    };

    const prevSlide = () => {
        showSlide(currentIndex - 1);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="slideshow-container">
            <div 
                className="slideshow" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, idx) => (
                    <img key={idx} src={src} alt={`Slide ${idx + 1}`} />
                ))}
            </div>
            <button className="arrow left-arrow" onClick={prevSlide}>&lt;</button>
            <button className="arrow right-arrow" onClick={nextSlide}>&gt;</button>
        </div>
    );
};

export default Slideshow;
