import React, { useContext, useEffect, useState } from 'react'
import { useOrders } from '../Contexts/OrdersContext'
import { AuthContext } from '../Contexts/AuthContext';
import QuenzyLoader from '../Loader/QuenzyLoader';

const OrderSummary = () => {

    const {orderProducts} = useOrders();
    const {user,loading} = useContext(AuthContext);

    const [address,setAddress] = useState("");

    if(loading){
        return <QuenzyLoader />
    }

    useEffect(()=>{
        console.log(orderProducts)
    },[])


  return (
    <div className='py-25 px-10'>
    <div>
        <h1 className='text-2xl font-bold mb-3'>Order Summary</h1>
        <div className="formfororder">
            <form className='flex flex-col gap-5'>
                <label htmlFor="username">
                    Name : 
                <input type="text" value={user.name} name="name" id="username" className='input input-primary' disabled/>
                </label>
                <label htmlFor="email">
                    Email : 
                <input type="text" value={user.email} name="name" id="email" className='input input-primary' disabled/>
                </label>
                <label htmlFor="address">
                    Address : 
                <textarea type="text" value={address} name="name" id="username" className='input input-primary' />
                </label>
            </form>
        </div>
        <div className="grid gap-6">
            {orderProducts.map(product=>{
                return <div>
                    <h1>{product.name}</h1>
                </div>
            })}
        </div>
    </div>
    </div>
  )
}

export default OrderSummary
