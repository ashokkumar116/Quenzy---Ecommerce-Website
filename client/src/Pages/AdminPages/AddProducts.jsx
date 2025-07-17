import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "../../axios";
import React, { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { TbUpload } from "react-icons/tb";

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

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const handleDelete = (indexToDelete) => {
    const updatedImages = selectedImages.filter((_, index) => index !== indexToDelete);
    setSelectedImages(updatedImages);
  };

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
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary uppercase mb-8 text-center">
        Add Products
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <input
            className="input input-bordered"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input input-bordered"
            placeholder="Short Description"
            value={short_description}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="input input-bordered"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="input input-bordered"
            placeholder="Discount Percentage"
            value={discount_percentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <input
            className="input input-bordered"
            placeholder="Available Stocks"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          <select
            className="select select-bordered"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={brand_id}
            onChange={(e) => setBrandId(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={seller_id}
            onChange={(e) => setSellerId(e.target.value)}
          >
            <option value="">Select Seller</option>
            {sellers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={is_active}
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          {/* Image Upload */}
          <div className="bg-base-100 border p-4 rounded-md">
            <div className="mb-3">
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
                id="product-images"
                className="hidden"
              />
              <label
                htmlFor="product-images"
                className="cursor-pointer inline-flex items-center gap-2 bg-base-300 hover:bg-base-200 px-4 py-2 rounded-full"
              >
                <TbUpload className="text-xl" /> Upload Images
              </label>
            </div>

            {/* Preview */}
            <div className="flex flex-wrap gap-3">
              {selectedImages.length > 0 ? (
                selectedImages.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="h-20 w-20 object-cover rounded border"
                    />
                    <TiDelete
                      onClick={() => handleDelete(index)}
                      className="absolute -right-2 -bottom-2 text-3xl text-error bg-white rounded-full cursor-pointer"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No images selected</p>
              )}
            </div>

            {selectedImages.length > 0 && (
              <p className="mt-2 text-sm text-gray-700">
                {selectedImages.length} image(s) selected
              </p>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <button className="btn btn-primary w-full" type="submit">
            Add Product
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} transition={Bounce} />

      {/* Product Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Available Products</h2>
        <div className="overflow-x-auto overflow-x-scroll">
          <table className="table w-full rounded-md ">
            <thead className="bg-base-300">
              <tr>
                <th>Name</th>
                <th>Short Description</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount %</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Seller</th>
                <th>Status</th>
                <th colSpan={3} className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr key={product.id} className="hover">
                    <td>{product.name}</td>
                    <td>{truncateText(product.short_description,30)}</td>
                    <td>{truncateText(product.description,30)}</td>
                    <td>${product.price}</td>
                    <td>{product.discount_percentage}%</td>
                    <td>{product.stock}</td>
                    <td>{product.category_name}</td>
                    <td>{product.brand_name}</td>
                    <td>{product.seller_name}</td>
                    <td>
                      <span
                        className={`badge ${
                          product.is_active ? "badge-success" : "badge-error"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td><button className="btn btn-sm btn-primary mr-2">View</button></td>
                    <td><button className="btn btn-sm btn-warning mr-2">Edit</button></td>
                    <td><button className="btn btn-sm btn-error">Delete</button></td>
                   
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
