// import React, { useContext, useEffect, useState } from 'react';
// import { asset } from '../assets/asset';
// import { AuthContext } from '../Contexts/AuthContext';
// import { useCart } from '../Contexts/CartContext';
// import { useNavigate } from 'react-router-dom';
// import QuenzyLoader from '../Loader/QuenzyLoader';

// const ProductCard = ({ product,isInCart }) => {

//   const { user, loading } = useContext(AuthContext);
//   const { addToCart, cart } = useCart();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('quenzy-cart')) || [];
//     setCartItems(storedCart);
//   }, []);

//   if (loading) return <QuenzyLoader />;

//   const offerPrice = product.discount_percentage
//     ? Math.round(product.price - (product.price * product.discount_percentage) / 100)
//     : product.price;


//   const rating = Math.round(product.rating || 0); // fallback to 0 if undefined

//   return (
//     <div className="border border-primary/50 rounded-md md:px-4 px-3 py-2 bg-base-100 min-w-66 max-w-86 w-full hover:scale-101 transition duration-200 ease-in-out">
//       <div
//         className="group cursor-pointer flex items-center justify-center px-2"
//         onClick={() => navigate(`/viewproduct/${product.slug}`)}
//       >
//         <img
//           className="group-hover:scale-105 transition max-w-26 md:max-w-46 h-40 mb-3 object-contain"
//           src={`${asset.imageBaseUrl}${product.images[0]?.image_url || 'default.jpg'}`}
//           alt={product.name}
//         />
//       </div>

//       <div className="text-base-content text-sm">
//         <p>{product.category_name}</p>
//         <p className="text-base-content font-medium text-lg truncate w-full">{product.name}</p>

//         <div className="flex items-center gap-0.5 mt-1">
//           {Array(5)
//             .fill('')
//             .map((_, i) =>
//               i < rating ? (
//                 <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
//                   <path
//                     d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
//                     className="fill-primary"
//                   />
//                 </svg>
//               ) : (
//                 <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
//                   <path
//                     d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
//                     className="fill-primary"
//                     fillOpacity="0.35"
//                   />
//                 </svg>
//               )
//             )}
//           <p>({product.rating || 0})</p>
//         </div>

//         <div className="flex items-end justify-between mt-3">
//           <p className="md:text-xl text-base font-medium text-primary">
//             ₹{offerPrice}{' '}
//             <span className="text-base-content/40 md:text-sm text-xs line-through">
//               ₹{product.price}
//             </span>
//           </p>

//           <div className="text-primary">
//             {isInCart ? (
//               <button
//                 onClick={() => navigate('/cart')}
//                 className="flex items-center justify-center gap-1 border border-secondary md:w-[100px] w-[64px] h-[34px] rounded text-secondary font-medium"
//               >
//                 🛒 Go to Cart
//               </button>
//             ) : (
//               <button
//                 onClick={() => addToCart(product)}
//                 className="flex items-center justify-center gap-1 border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium"
//               >
//                 ➕ Add
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
