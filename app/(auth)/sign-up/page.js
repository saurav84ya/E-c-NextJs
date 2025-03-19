"use client"
import { login, reg } from '@/app/redux/slice';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function page() {

    const dispatch = useDispatch();
    const { isLoading, error, isAuth ,user } = useSelector((state) => state.auth);
    console.log("isAuth",isAuth,user)

    const [formData, setFormData] = useState({name : "" ,email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        dispatch(reg(formData));
               
        
        // console.log("f",formData)
    };


  return (
    <main className='w-full flex justify-center items-center bg-gray-300  min-h-screen  ' >
    <section className='flex flex-col gap-3 ' >
        <div className='flex justify-center' >
            <Image alt='logo' src={"/logo.png"} width={120} height={200}  />
        </div>
        <div className='bg-white p-10 gap-3 rounded-xl w-[350px] md:min-w-[440px]  ' >
            <h1 className='font-bold text-xl  ' >
                Create an Account
            </h1>
            <div className='flex my-3 flex-col gap-3' >
                < >
                <input
                onChange={handleChange} 
                        placeholder='Enter Your Name'    
                        type='text'
                        name='name'
                        id='user-name'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <input
                    onChange={handleChange} 
                        placeholder='Enter Your Email'    
                        type='email'
                        name='email'
                        id='user-email'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <input
                    onChange={handleChange} 
                        placeholder='Enter Your Password'    
                        type='password'
                        name='password'
                        id='user-password'
                        className='px-3 py-2 rounded-xl border focus:outline-none w-full '
                    />
                    <button disabled={isLoading}  onClick={handleSubmit}  className=' cursor-pointer bg-blue-500 p-3 font-bold text-white rounded-xl ' >
                       
                        {
                    !isLoading ? "Create an Account" : "Loading..."
                }
                        </button>
                </>
            </div>
            <div className='flex  justify-between  border-b pb-5' >
                <Link className='text-blue-800 font-semibold '  href={'/login'}>
                  already account ? login
                </Link>
            </div>
            
            <button  className=' mt-5 cursor-pointer bg-gray-300 p-3 w-full font-semibold text-black rounded-xl ' >
            Sign up With Google
            </button>

        </div>


    </section>
</main>
  )
}
