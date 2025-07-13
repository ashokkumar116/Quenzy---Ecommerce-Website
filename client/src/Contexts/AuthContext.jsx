import axios from "../axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null);
    const [message,setMessage] = useState(null);
    const [loading,setLoading] = useState(false);

    const fetchUser = async()=>{
        try {
            setLoading(true);
            const me = await axios.get('/auth/getUser',{withCredentials:true});
            setUser(me.data);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const login = async({email,password})=>{
        try {
            setLoading(true);
            const response = await axios.post('/auth/login',{email,password},{withCredentials:true});
            if(response.status === 200){
                fetchUser();
                return true;
            }
        } catch (error) {
            setMessage(error.response.data.message);
            console.log(error);
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return <AuthContext.Provider value={{user,loading,message,login}} >{children}</AuthContext.Provider>
    
}