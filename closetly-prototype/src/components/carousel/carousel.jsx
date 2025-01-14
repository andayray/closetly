import React, { useRef, useState, useEffect } from 'react';
import './carousel.css';
// import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Carousel = () => {
    const { currentUser } = useAuth();
    const carouselRef = useRef(null); // Ref for the carousel
    const [imgWidth, setImgWidth] = useState(0); // Store the width of one image
    const [hideRightArrow, setHideRightArrow] = useState(false); // Control right arrow visibility
    const [hideLeftArrow, setHideLeftArrow] = useState(true); // Control left arrow visibility

    const [imgs, setImgs] = useState([
        "outer-1.jpg",
        "outer-2.jpg",
        "outer-3.jpg",
        "outer-4.jpg",
        "outer-5.jpg",
    ]); // Default images

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                const firstImg = carouselRef.current.querySelector("img");
                if (firstImg) {
                    setImgWidth(firstImg.clientWidth + 50); // Adjust for margin
                }
            }
        };

        const observer = new ResizeObserver(updateWidth);
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        updateWidth(); // Initial width calculation

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!carouselRef.current || imgWidth === 0) return;

            const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
            const currentScrollLeft = carouselRef.current.scrollLeft;

            // Hide right arrow when at the last image
            setHideRightArrow(currentScrollLeft >= maxScrollLeft - 1);
            setHideLeftArrow(currentScrollLeft <= 0);
        };

        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [imgWidth]);

    const scrollCarousel = (direction) => {
        if (!carouselRef.current || imgWidth === 0) return;
        const scrollAmount = direction === "left" ? -imgWidth : imgWidth;
        carouselRef.current.scrollLeft += scrollAmount;
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImgs = files.map((file) => URL.createObjectURL(file));
        setImgs((prevImgs) => [...prevImgs, ...newImgs]);
    };

    if (!currentUser) {
        return <div className="text-2xl font-bold pt-14">Loading...</div>;
    }

    return (

        <div className="wrapper">

            <div className="upload-container">
                <label htmlFor="upload" className="upload-button">
                    Upload Images
                </label>
                <input
                    type="file"
                    id="upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                />
            </div>

            {!hideLeftArrow && (
                <i
                    className="fa-icon fa-solid fa-angle-left fa-icon-left"
                    onClick={() => scrollCarousel("left")}
                ></i>
            )}

            <div
                className="carousel"
                ref={carouselRef}
                style={{ cursor: 'grab', overflowX: 'scroll', display: 'flex' }}
            >
                {imgs.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} alt={`Slide ${idx + 1}`} />
                ))}
            </div>

            {!hideRightArrow && (
                <i
                    className="fa-icon fa-solid fa-angle-right fa-icon-right"
                    onClick={() => scrollCarousel("right")}
                ></i>
            )}

        </div>
    


    );
};

export default Carousel;
