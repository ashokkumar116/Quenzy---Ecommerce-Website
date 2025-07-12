import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { SampleNextArrow, SamplePrevArrow } from './Arrows';


const CategoriesListing = () => {
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        const response = await axios.get('https://dummyjson.com/products/categories');
        setCategories(response.data);
    }

    useEffect(() => {
        fetchCategories();
    }, [])
    

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        prevArrow :<SamplePrevArrow /> ,
        nextArrow :<SampleNextArrow />
    };      
    

    return (
        <div className='w-full px-7 py-2'>
            {categories.length > 0 ? (
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} className="px-2">
                            <p className="bg-base-300 rounded p-2 text-center capitalize">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </Slider>
            ) : <p>Loading ....</p> }
        </div>
    )
}

export default CategoriesListing
