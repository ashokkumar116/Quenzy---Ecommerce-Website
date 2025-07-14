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
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from "react-rating-stars-component";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";


const Home = () => {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchMoreProducts = async () => {
        const res = await axios.get(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const newProducts = res.data.products;
        setProducts((prev) => [...prev, ...newProducts]);
        setSkip((prev) => prev + limit);
        if (skip + limit >= res.data.total) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchMoreProducts();
    },[]);

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
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreProducts}
                    hasMore={hasMore}
                    loader={
                        <MiniQuenzyLoader/>
                    }
                    endMessage={
                        <p className="text-center text-gray-500 mt-4">
                            No more products to show.
                        </p>
                    }
                >

                    <div className="grid grid-cols-4 gap-10 p-5">
                      {products.map((product)=>{
                        return <div className="bg-base-300 p-5 shadow-lg rounded-md flex flex-col justify-center items-center hover:scale-102 transition-all duration-100 cursor-pointer">
                          <img src={product.thumbnail} className="h-60" alt={product.title} />
                          <h1>{product.title}</h1>
                          <ReactStars count={5} value={4} size={24}  activeColor="#ffd700" edit={false} /> 
                        </div>
                      })}
                    </div>

                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Home;
