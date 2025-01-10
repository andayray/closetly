import React, {useRef, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import './home.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css';

const AUTO_DELAY = 10000; // 10 seconds
const DRAG_BUFFER = 50; // Threshold for drag detection
const imgs = [
    "outer-1.jpg",
    "outer-2.jpg",
    "outer-3.jpg",
    "outer-4.jpg",
    "outer-5.jpg",
];

const Home = () => {
    const { currentUser } = useAuth();
    const carouselRef = useRef(null); // Ref for the carousel
    const firstImgWidth = useRef(0); // Store first image width
    const [imgWidth, setImgWidth] = useState(0); // Store the width of one image
    const [isDragStart, setIsDragStart] = useState(false); // Track if dragging has started
    const [startX, setStartX] = useState(0); // Initial mouse position
    const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                const firstImg = carouselRef.current.querySelector("img");
                if (firstImg) {
                    setImgWidth(firstImg.clientWidth + 51);
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

    const handleScroll = (direction) => {
        if (!carouselRef.current || imgWidth === 0) return;
        const scrollAmount = direction === "left" ? -imgWidth : imgWidth;
        carouselRef.current.scrollLeft += scrollAmount;
    };

    const dragStart = (e) => {
        setIsDragStart(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setScrollLeft(carouselRef.current.scrollLeft);
        carouselRef.current.style.cursor = 'grabbing';
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        const currentX = e.pageX || e.touches[0].pageX;
        const distance = currentX - startX;
        carouselRef.current.scrollLeft = scrollLeft - distance;
    };

    const dragStop = () => {
        setIsDragStart(false);
        carouselRef.current.style.cursor = 'grab';
    };

    if (!currentUser) {
        return <div className="text-2xl font-bold pt-14">Loading...</div>;
    }

    return (
        <>

<div className="wrapper">
            <i
                className="fa-icon fa-solid fa-angle-left fa-icon-left"
                onClick={() => handleScroll("left")}
            ></i>

            <div
                className="carousel"
                ref={carouselRef}
                style={{ cursor: 'grab' }}
            >
                {imgs.map((imgSrc, idx) => (
                    <img key={idx} src={imgSrc} alt={`Slide ${idx + 1}`} />
                ))}
            </div>

            <i
                className="fa-icon fa-solid fa-angle-right fa-icon-right"
                onClick={() => handleScroll("right")}
            ></i>
        </div>

        </>

    );
};

export default Home;
