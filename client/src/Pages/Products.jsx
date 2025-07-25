import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Slider } from "primereact/slider";
import InfiniteScroll from "react-infinite-scroll-component";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
// import ProductCard from "../Components/ProductCard";
import { useCart } from "../Contexts/CartContext";
import ProductCard from "../Components/ProductCard";
import { ToastContainer } from "react-toastify";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { cart } = useCart();

    const fetchFilters = async () => {
        try {
            const res = await axios.get("/filters/getfilters");
            const { categories, brands, priceRange } = res.data;

            setCategories(categories);
            setBrands(brands);

            const min = parseFloat(priceRange.min);
            const max = parseFloat(priceRange.max);
            setPriceRange({ min, max });
            setSelectedPriceRange([min, max]);
        } catch (err) {
            console.error("Error fetching filters", err);
        }
    };

    const fetchFilteredProducts = async (pageNo = 1) => {
        try {
            const res = await axios.get("/filters/fetchproductsbyfilter", {
                params: {
                    categories: selectedCategories.join(","),
                    brands: selectedBrands.join(","),
                    minPrice: selectedPriceRange[0],
                    maxPrice: selectedPriceRange[1],
                    page: pageNo,
                    limit: 9,
                },
            });

            if (pageNo === 1) {
                setProducts(res.data.products);
            } else {
                setProducts((prev) => [...prev, ...res.data.products]);
            }

            setHasMore(res.data.hasMore);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };
    useEffect(() => {
        if (categories.length > 0 || brands.length > 0) {
            setPage(1);
            fetchFilteredProducts(1);
        }
    }, [selectedCategories, selectedBrands, selectedPriceRange]);

    const fetchNext = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchFilteredProducts(nextPage);
    };

    useEffect(() => {
        fetchFilters();
    }, []);

    return (
        <div className="bg-base-300 min-h-screen py-20">
            <h1 className="text-3xl font-bold text-center my-10">Products</h1>
            <div className="flex gap-10 px-5 py-3">
                {/* Filters Sidebar */}
                <div className="filtersbar bg-base-100 shadow-lg px-5 py-3 pb-6 rounded-lg">
                    <div className="flex flex-col gap-5">
                        {/* Categories */}
                        <div className="categories-listing">
                            <h2 className="text-2xl font-semibold mb-3">
                                Categories
                            </h2>
                            {categories.map((category) => (
                                <label
                                    key={category.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={category.id}
                                        onChange={(e) => {
                                            const value = Number(
                                                e.target.value
                                            );
                                            setSelectedCategories((prev) =>
                                                e.target.checked
                                                    ? [...prev, value]
                                                    : prev.filter(
                                                          (item) =>
                                                              item !== value
                                                      )
                                            );
                                        }}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>

                        {/* Brands */}
                        <div className="brands-listing">
                            <h2 className="text-2xl font-semibold mb-3">
                                Brands
                            </h2>
                            {brands.map((brand) => (
                                <label
                                    key={brand.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        value={brand.id}
                                        onChange={(e) => {
                                            const value = Number(
                                                e.target.value
                                            );
                                            setSelectedBrands((prev) =>
                                                e.target.checked
                                                    ? [...prev, value]
                                                    : prev.filter(
                                                          (item) =>
                                                              item !== value
                                                      )
                                            );
                                        }}
                                    />
                                    {brand.name}
                                </label>
                            ))}
                        </div>

                        {/* Price Slider */}
                        <div className="price-range">
                            <h2 className="text-2xl font-semibold mb-2">
                                Price Range
                            </h2>
                            <p className="mb-2">
                                ₹{selectedPriceRange[0]} - ₹
                                {selectedPriceRange[1]}
                            </p>
                            <Slider
                                value={selectedPriceRange}
                                onChange={(e) => setSelectedPriceRange(e.value)}
                                range
                                min={priceRange.min}
                                max={priceRange.max}
                                step={100}
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="productsListing flex-1 bg-base-100 shadow-lg px-5 py-3 rounded-lg">
                    <InfiniteScroll
                        dataLength={products.length}
                        next={fetchNext}
                        hasMore={hasMore}
                        loader={<MiniQuenzyLoader />}
                        endMessage={
                            <p className="text-center py-4 text-sm text-gray-500">
                                No more products
                            </p>
                        }
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                            {products.map((product) => {
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
                </div>
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

export default Products;
