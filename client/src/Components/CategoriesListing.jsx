import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from './Arrows';
import MiniQuenzyLoader from '../Loader/MiniQuenzyLoader';


const CategoriesListing = () => {
    const [categories, setCategories] = useState([]);
    const [slidesCount,setSlidesCount] = useState(null);

    const fetchCategories = async () => {
        const response = await axios.get('/categories/getcategories');
        console.log(response.data);
        setCategories(response.data);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            if(categories.length < 6){
                setSlidesCount(categories.length);
        }
    }
        else{
            setSlidesCount(6);
        }
    },[categories])
    

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesCount,
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
            ) : <MiniQuenzyLoader/> }
        </div>
    )
}

export default CategoriesListing
