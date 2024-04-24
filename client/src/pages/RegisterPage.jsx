import React, { useState } from 'react'
import axios from "axios"; 
import { NavLink } from 'react-router-dom';
const RegisterPage = () => {
  const [name,setName]=useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const registeruser= async(event)=>{
    event.preventDefault();
     try {
      await axios.post("/register",{
        name,
        email,
        password,
       });
       alert("registeration succesfull you can log in");
     } catch (error) {
       alert("registeration failed Please try again");
     }
  }
  return (
      <div className='mt-4 grow flex items-center justify-center'>
            <div className='mb-56'>
                <h1 className='text-4xl text-center mb-4'>Register Page</h1>
                <form className='max-w-md mx-auto' onSubmit={registeruser}>
                    <input type="text" name="" id=""  placeholder='Your name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder='your@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" name="" id="" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>Already have a account ?  <NavLink className="text-black underline" to="/login">Login</NavLink>                    
                   </div>
                </form>
            </div>
        </div>
  )
}

export default RegisterPage
