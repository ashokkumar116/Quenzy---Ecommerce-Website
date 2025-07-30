import React, { useEffect, useState } from 'react'
import axios from '../axios'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from './Arrows';
import MiniQuenzyLoader from '../Loader/MiniQuenzyLoader';
import { useNavigate } from 'react-router-dom';


const CategoriesListing = () => {
    const [categories, setCategories] = useState([]);
    const [slidesCount,setSlidesCount] = useState(null);

    const navigate = useNavigate();

    const fetchCategories = async () => {
        const response = await axios.get('/categories/getcategoriespage');
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
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true, 
        prevArrow :<SamplePrevArrow /> ,
        nextArrow :<SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
        
    };      
    

    return (
        <div className='w-full px-7 py-2'>
            {categories.length > 0 ? (
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <div key={index} className="px-2 cursor-pointer" onClick={()=>navigate(`/viewproductbycategory/${category.slug}`)}>
                            <p className="bg-base-100 rounded p-2 text-center capitalize">
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
