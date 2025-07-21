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
    const [count, setCount] = useState(0);

    const fetchMoreProducts = async () => {
        const page = Math.floor(skip / limit) + 1;
        const res = await axios.get(`/products/getproducts?page=${page}&limit=${limit}`);
        const newProducts = res.data.products;
        setProducts((prev) => [...prev, ...newProducts]);
        setSkip((prev) => prev + limit);
        if (skip + limit >= res.data.total) {
            setHasMore(false);
        }
        if (newProducts.length < limit) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchMoreProducts();
        const storedCart = JSON.parse(localStorage.getItem("quenzy-cart")) || [];
        setCartItems(storedCart);
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
                            <b>No more products to show...</b>
                        </p>
                    }
                >

                    <div className="grid grid-cols-4 gap-5 px-20">
                    
                      {products.length>0 && products.map((product)=>{
                        const isInCart = cart.find(item => item.id === product.id);
                        const offerPrice = product.price - (product.price * product.discount_percentage / 100);
                        return  <div className="border border-primary/50 rounded-md md:px-4 px-3 py-2 bg-base-100 min-w-66 max-w-86 w-full hover:scale-101 transition duration-200 ease-in-out " key={product.id}>
                        <div className="group cursor-pointer flex items-center justify-center px-2" onClick={()=>navigate(`/viewproduct/${product.slug}`)}>
                            <img className="group-hover:scale-105 transition max-w-26 md:max-w-46 h-40 mb-3" src={`${asset.imageBaseUrl}${product.images[0]?.image_url}`} alt={product.name} />
                        </div>
                        <div className="text-base-content text-sm ">
                            <p>{product.category_name}</p>
                            <p className="text-base-content font-medium text-lg truncate w-full">{product.name}</p>
                            <div className="flex items-center gap-0.5">
                                {Array(5).fill('').map((_, i) => (
                                    {/*product.rating*/} ,4 > i ? (
                                        <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" className="fill-primary" />
                                        </svg>
                                    ) : (
                                        <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" className="fill-primary" fill-opacity="0.35" />
                                        </svg>
                                    )
                                ))}
                                <p>({4})</p>
                            </div>
                            <div className="flex items-end justify-between mt-3">
                                <p className="md:text-xl text-base font-medium text-primary">
                                ₹{offerPrice} <span className="text-base-content/40 md:text-sm text-xs line-through">₹{product.price}</span>
                                </p>
                                <div className="text-primary ">
                                        {
                                            isInCart ? 
                                            <button onClick={()=>navigate('/cart')} className="flex cursor-pointer items-center justify-center gap-1 border border-secondary md:w-[100px] w-[64px] h-[34px] rounded text-secondary font-medium" >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" className="stroke-secondary" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Go to Cart
                                        </button>
                                        :
                                        <button onClick={()=>addToCart(product)} className="flex cursor-pointer items-center justify-center gap-1 border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium" >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" className="stroke-primary" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            Add
                                        </button>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
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
