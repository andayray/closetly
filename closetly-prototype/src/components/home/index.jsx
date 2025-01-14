import React from 'react';
import Carousel from '../carousel/carousel';
import './home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Gallery</h1>
            <div className="wrapper">
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
                <Carousel />
            </div>
        </div>
    );
};

export default Home;
