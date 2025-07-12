import React from "react";
import CategoriesListing from "../Components/CategoriesListing";
import Slider from "react-slick";
import img1 from "../assets/sample1.webp";
import img2 from "../assets/sample2.webp";
import img3 from "../assets/sample3.webp";
import { NextArrow, PrevArrow, SampleNextArrow, SamplePrevArrow } from "../Components/Arrows";

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow :<PrevArrow /> ,
        nextArrow :<NextArrow />
    };
    return (
        <div className="mt-25">
            <CategoriesListing />
            <div className="carousal mt-5">
                <Slider {...settings}>
                    <img src={img1} alt="Slide 1" />
                    <img src={img2} alt="Slide 2" />
                    <img src={img3} alt="Slide 3" />
                </Slider>
            </div>
        </div>
    );
};

export default Home;
