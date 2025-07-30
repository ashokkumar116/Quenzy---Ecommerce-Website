import React, { useContext, useEffect, useState } from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
import QuenzyLoader from "../Loader/QuenzyLoader";
import { asset } from "../assets/asset";

import  {AuthContext}  from "../Contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const Home = () => {

    const {user , loading} =  useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const {addToCart , cart} = useCart();
    const navigate = useNavigate();

    if(loading) return <QuenzyLoader />;



    
      
      
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchMoreProducts = async () => {
        const page = Math.floor(skip / limit) + 1;
    
        try {
            const res = await axios.get(`/products/getproducts?page=${page}&limit=${limit}`);
            const newProducts = res.data.products;
    
            setProducts((prev) => {
                const uniqueProducts = newProducts.filter(
                    (p) => !prev.some((item) => item.id === p.id)
                );
                return [...prev, ...uniqueProducts];
            });
    
            const newSkip = skip + limit;
            setSkip(newSkip);
    
            const total = res.data.total;
            if (newSkip >= total || newProducts.length < limit) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };
    

    useEffect(() => {
        fetchMoreProducts(); 
        const storedCart = JSON.parse(localStorage.getItem("quenzy-cart")) || [];
        setCartItems(storedCart);
    }, []);
    

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
        <div className="py-25 bg-base-300">
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
                    loader={<MiniQuenzyLoader />}
                    endMessage={
                        <p className="text-center text-base-content/40 italic mt-4">
                            <p>No more products to show...</p>
                        </p>
                    }
                >

                    <div className="grid md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:px-20">
                    
                      {products.length>0 && products.map((product)=>{
                        const isInCart = cart.find(
                            (item) => item.id === product.id
                        );
                        const offerPrice =
                            product.price -
                            (product.price *
                                product.discount_percentage) /
                                100;
                        return (
                            <ProductCard
                                key={`product-${product.id}`}
                                product={product}
                                offerPrice={offerPrice}
                                isInCart={isInCart}
                            />
                        );
                      })}
                      
                    </div>
                </InfiniteScroll>
                    {products.length === 0 && <MiniQuenzyLoader />}
                    
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Home;
