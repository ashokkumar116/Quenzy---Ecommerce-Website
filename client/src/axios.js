import axios from "axios";

const instance = axios.create({
    baseURL:"https://quenzy-ecommerce-website.onrender.com/api",
    withCredentials: true,
});


export default instance;