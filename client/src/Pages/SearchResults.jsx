// Pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import ProductCard from "../Components/ProductCard";
import { useCart } from "../Contexts/CartContext";
import { ToastContainer } from "react-toastify";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("query");
    const { cart } = useCart();

    useEffect(() => {
        const fetchSearchedProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/searchbar/search?query=${query}`);
                setProducts(res.data.products || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchSearchedProducts();
    }, [query]);

    return (
        <div className="py-30 px-5 bg-base-300">
            <h2 className="text-xl mb-4">
                Search results for: <strong>{query}</strong>
            </h2>

            {loading ? (
                <MiniQuenzyLoader/>
            ) : products.length === 0 ? (
                <p className="bg-base-100 p-5 rounded-lg shadow-lg">
                    😕 No products found. Try searching with a different keyword or check back later.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-base-100 p-5 rounded-lg shadow-lg">
                    {products.map((product) => {
                        const isInCart = cart.find(
                            (item) => item.id === product.id
                        );
                        const offerPrice =
                            product.price -
                            (product.price * product.discount_percentage) / 100;
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isInCart={isInCart}
                                offerPrice={offerPrice}
                            />
                        );
                    })}
                </div>
            )}

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

export default SearchResults;
