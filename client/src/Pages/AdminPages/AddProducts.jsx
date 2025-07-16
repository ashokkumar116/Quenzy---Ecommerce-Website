import axios from '../../axios';
import React, { useEffect, useState } from 'react'

const AddProducts = () => {

  const [brands,setBrands] = useState([]);
  const [categories,setCategories] = useState([]);
  const [sellers,setSellers] = useState([]);


  const fetchDatas = async()=>{
    const brandsres =await axios.get('/brands/getbrands');
    const categoriesres =await axios.get('/categories/getCategories');
    const sellersres = await axios.get('/sellers/getallsellers');
    setBrands(brandsres.data);
    setCategories(categoriesres.data);
    setSellers(sellersres.data);
  }

  useEffect(()=>{
    fetchDatas();
  })

  return (
    <div className='pt-20'>
      <h1 className='text-3xl font-bold text-primary uppercase mb-5' >Add Products</h1>
      <form className='flex flex-col gap-5'>
        <input className='input-prime' placeholder="Product Name" type="text" name='name' />
        <input className='input-prime' placeholder="Product Description(Short)" type="text" name='short_description' />
        <textarea className='input-prime' placeholder="Description" type="text" name='description' />
        <input className='input-prime' placeholder="Price" type="text" name='price' />
        <input className='input-prime' placeholder="Discount Percentage" type="text" name='discount_price' />
        <input className='input-prime' placeholder="Available Stocks" type="text" name='stock' />
        <select name="category_id" className='select-prime' >
          <option value="" >Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id} >{category.name}</option>
          ))}
        </select>
        <select name="brand_id" className='select-prime'>
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <select name="seller_id" className='select-prime'>
          <option value="">Select Seller</option>
          {sellers.map(seller => (
            <option key={seller.id} value={seller.id}>{seller.name}</option>
          ))}
        </select>
        <select name="is_active" className='select-prime'>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <input className='input-prime' placeholder="Product Image" type="file" name='image' multiple />

        <button className='btn btn-success' type='submit'>Add Product</button>
      </form>
    </div>
  )
}

export default AddProducts
