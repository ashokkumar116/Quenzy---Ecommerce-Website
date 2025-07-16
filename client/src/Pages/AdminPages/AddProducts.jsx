import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "../../axios";
import React, { useEffect, useState } from "react";

const AddProducts = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [short_description, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount_percentage, setDiscountPercentage] = useState("");
    const [stock, setStock] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [brand_id, setBrandId] = useState("");
    const [seller_id, setSellerId] = useState("");
    const [is_active, setIsActive] = useState("1");
    const [selectedImages, setSelectedImages] = useState([]);

    const fetchDatas = async () => {
        const brandsres = await axios.get("/brands/getbrands");
        const categoriesres = await axios.get("/categories/getCategories");
        const sellersres = await axios.get("/sellers/getallsellers");
        const productsres = await axios.get("/products/getproducts");
        setBrands(brandsres.data);
        setCategories(categoriesres.data);
        setSellers(sellersres.data);
        setProducts(productsres.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("short_description", short_description);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("discount_percentage", discount_percentage);
        formData.append("stock", stock);
        formData.append("category_id", category_id);
        formData.append("brand_id", brand_id);
        formData.append("seller_id", seller_id);
        formData.append("is_active", is_active);
        selectedImages.forEach((image) => {
            formData.append("images", image);
        });

        try {
            const res = await axios.post("/products/addproduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                setName("");
                setShortDescription("");
                setDescription("");
                setPrice("");
                setDiscountPercentage("");
                setStock("");
                setCategoryId("");
                setBrandId("");
                setSellerId("");
                setIsActive("1");
                setSelectedImages([]);
                toast.success("Product added successfully!");
                fetchDatas();
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("An error occurred while adding the product.");
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);

    return (
        <div className="pt-20">
            <h1 className="text-3xl font-bold text-primary uppercase mb-5">
                Add Products
            </h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    className="input-prime"
                    placeholder="Product Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="input-prime"
                    placeholder="Product Description(Short)"
                    type="text"
                    name="short_description"
                    value={short_description}
                    onChange={(e) => setShortDescription(e.target.value)}
                />
                <textarea
                    className="input-prime"
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="input-prime"
                    placeholder="Price"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    className="input-prime"
                    placeholder="Discount Percentage"
                    type="text"
                    name="discount_percentage"
                    value={discount_percentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                />
                <input
                    className="input-prime"
                    placeholder="Available Stocks"
                    type="text"
                    name="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <select
                    name="category_id"
                    className="select-prime"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    name="brand_id"
                    className="select-prime"
                    value={brand_id}
                    onChange={(e) => setBrandId(e.target.value)}
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                <select
                    name="seller_id"
                    className="select-prime"
                    value={seller_id}
                    onChange={(e) => setSellerId(e.target.value)}
                >
                    <option value="">Select Seller</option>
                    {sellers.map((seller) => (
                        <option key={seller.id} value={seller.id}>
                            {seller.name}
                        </option>
                    ))}
                </select>
                <select
                    name="is_active"
                    className="select-prime"
                    value={is_active}
                    onChange={(e) => setIsActive(e.target.value)}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>

                <input
                    className="input-prime"
                    placeholder="Product Image"
                    type="file"
                    name="image"
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setSelectedImages(files);
                    }}
                />

                <button className="btn btn-success" type="submit">
                    Add Product
                </button>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Short Description</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Discount Percentage</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Seller</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                            products.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.short_description}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.discount_percentage}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.brand_name}</td>
                                        <td>{product.seller_name}</td>
                                        <td>
                                            {product.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddProducts;
