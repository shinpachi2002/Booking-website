import React, { useContext } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
const LoginPage = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[redirect,setRedirect]=useState(false);
    const {setUser} =useContext(UserContext);
    const handloginSubmit=async(event)=>{
        event.preventDefault();
         try {
          const {data}= await axios.post("/login",{
                email,
                password
            },);
            setUser(data);
            alert("login successfull");
            setRedirect(true);
         } catch (error) {
             alert("Login failed");
         }
    }
    if(redirect){
      return <Navigate to={"/"}></Navigate>
    }
    return (
        <div className='mt-4 grow flex items-center justify-center'>
            <div className='mb-56'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto ' onSubmit={handloginSubmit}>
                    <input type="text" placeholder='your@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" name="" id="" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>Don't have an Account Yet ?  <NavLink className="text-black underline" to="/register">Register </NavLink>                    
                   </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
