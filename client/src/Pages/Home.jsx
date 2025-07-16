import React, { useEffect, useState } from "react";
import CategoriesListing from "../Components/CategoriesListing";
import Slider from "react-slick";
import img1 from "../assets/sample1.webp";
import img2 from "../assets/sample2.webp";
import img3 from "../assets/sample3.webp";
import {
    NextArrow,
    PrevArrow,
} from "../Components/Arrows";
import axios from "../axios";
// import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from "react-rating-stars-component";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchMoreProducts = async () => {
        const res = await axios.get('/products/getproducts');
        // const newProducts = res.data.products;
        // setProducts((prev) => [...prev, ...newProducts]);
        // setSkip((prev) => prev + limit);
        // if (skip + limit >= res.data.total) {
        //     setHasMore(false);
        // }
        setProducts(res.data);
    };

    useEffect(() => {
        fetchMoreProducts();
    },[]);

    useEffect(()=>{
        console.log(products);
    },[products]);  

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
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
            <div className="products mt-10">

                    <div className="grid grid-cols-4 gap-10 p-5">
                      {products.length>0 && products.map((product)=>{
                        return <div className="bg-base-300 p-5 shadow-lg rounded-md flex flex-col justify-center items-center hover:scale-102 transition-all duration-100 cursor-pointer">
                          <img src={`http://localhost:5000${product.images[0]?.image_url}`} className="h-60" alt={product.name} />
                          <h1>{product.name}</h1>
                          <ReactStars count={5} value={4} size={24}  activeColor="#ffd700" edit={false} /> 
                        </div>
                      })}
                    </div>
                    {products.length === 0 && <MiniQuenzyLoader />}

            </div>
        </div>
    );
};

export default Home;
