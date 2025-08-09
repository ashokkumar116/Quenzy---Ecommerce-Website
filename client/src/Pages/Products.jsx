import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Slider } from "primereact/slider";
import InfiniteScroll from "react-infinite-scroll-component";
import MiniQuenzyLoader from "../Loader/MiniQuenzyLoader";
import { useCart } from "../Contexts/CartContext";
import ProductCard from "../Components/ProductCard";
import { ToastContainer } from "react-toastify";
import { BiCategory } from "react-icons/bi";
import { HiOutlineTag, HiOutlineCurrencyRupee } from "react-icons/hi";
import { FiFilter, FiX } from "react-icons/fi";

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
    const [isFilterOpen, setIsFilterOpen] = useState(false); 

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

    const FiltersSidebar = () => (
        <div className="bg-base-100 shadow-lg px-5 py-3 pb-6 rounded-lg w-72">
            <div className="flex flex-col gap-5">
                {/* Categories */}
                <div>
                    <h2 className="text-2xl max-md:text-lg font-semibold mb-3 flex items-center gap-2">
                        <BiCategory /> Categories
                    </h2>
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                checked={selectedCategories.includes(category.id)}
                                type="checkbox"
                                value={category.id}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setSelectedCategories((prev) =>
                                        e.target.checked
                                            ? [...prev, value]
                                            : prev.filter((item) => item !== value)
                                    );
                                }}
                            />
                            {category.name}
                        </label>
                    ))}
                </div>

                {/* Brands */}
                <div>
                    <h2 className="text-2xl max-md:text-lg font-semibold mb-3 flex items-center gap-2">
                        <HiOutlineTag /> Brands
                    </h2>
                    {brands.map((brand) => (
                        <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={brand.id}
                                checked={selectedBrands.includes(brand.id)}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setSelectedBrands((prev) =>
                                        e.target.checked
                                            ? [...prev, value]
                                            : prev.filter((item) => item !== value)
                                    );
                                }}
                            />
                            {brand.name}
                        </label>
                    ))}
                </div>

                {/* Price Slider */}
                <div>
                    <h2 className="text-2xl max-md:text-[16px] font-semibold mb-2 flex items-center gap-2">
                        <HiOutlineCurrencyRupee /> Price Range
                    </h2>
                    <p className="mb-2">₹{selectedPriceRange[0]} - ₹{selectedPriceRange[1]}</p>
<div style={{ touchAction: "none" }}>
  <Slider
    value={selectedPriceRange}
    onChange={(e) => setSelectedPriceRange(e.value)}
    range
    min={priceRange.min}
    max={priceRange.max}
    step={100}
    style={{ width: "80%" }}
  />
</div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-base-300 min-h-screen py-20">
            <h1 className="text-3xl font-bold text-center my-10 text-primary">Products</h1>

            {/* Mobile Filter Button */}
            <div className="lg:hidden px-5 mb-4">
                <button
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow"
                    onClick={() => setIsFilterOpen(true)}
                >
                    <FiFilter /> Filters
                </button>
            </div>

            <div className="flex gap-10 px-5 py-3 max-md:text-sm">
                {/* Sidebar for Large Screens */}
                <div className="hidden lg:block">
                    <FiltersSidebar />
                </div>

                {/* Product Listing */}
                <div className="flex-1 bg-base-100 shadow-lg px-5 py-3 rounded-lg">
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
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:px-5 place-items-center">
                            {products.map((product) => {
                                const isInCart = cart.find((item) => item.id === product.id);
                                const offerPrice =
                                    product.price - (product.price * product.discount_percentage) / 100;
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

            {/* Mobile Sidebar Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex">
                    <div className="bg-white w-72 p-5 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Filters</h2>
                            <button className="cursor-pointer" onClick={() => setIsFilterOpen(false)}>
                                <FiX size={24} />
                            </button>
                        </div>
                        <FiltersSidebar />
                    </div>
                    <div className="flex-1" onClick={() => setIsFilterOpen(false)}></div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default Products;
