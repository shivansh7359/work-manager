"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import signup from "../../assets/signup.svg"
import { toast } from 'react-toastify'
import { signUp } from "@/service/userService"

const Signup = () => {

    let[data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const doSignup = async(e) => {
        e.preventDefault()

        if(data.name.trim() === "" || data.name === null){
            toast.warning("Name is required !!", {
                position: 'top-center'
            })
            return
        }
        try{
            const result = await signUp(data)
            // console.log(result)
            toast.success("User Registered", {
                position: 'top-center'
            })

            setData({
                name: "",
                email: "",
                password: ""
            })
        }
        catch(error){
            console.log(error);
            toast.error("Signup Error !! " + error.response.data.message, {
                position: 'top-center'
            })
        }
    }

    const resetForm = () => {
        setData({
            name: "",
            email: "",
            password: ""
        })
    }

  return (
    <div className='grid grid-cols-12'>
        
        <div className='col-span-4 col-start-5 '>
            <div className='py-5'>
                
                <div className='my-8 flex justify-center'>
                    <Image src={signup} alt='signup' style={{width: "40%"}}/>
                </div>

                <h1 className='text-3xl text-center'>Signup Here </h1>

                <form action="#!" className='mt-5' onSubmit={doSignup}>

                    {/* name */}
                    <div className='mt-3'>
                        <label htmlFor="user_name" className='block text-sm font-medium mb-2 ps-2'>
                            Name
                        </label>
                        <input 
                            type="text" 
                            id='user_name' 
                            className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800' 
                            placeholder='Enter here'
                            name='user_name'
                            value={data.name}
                            onChange={(e)=> {setData({...data, name:e.target.value})}} 
                        />
                    </div>

                    {/* email */}
                    <div className='mt-3'>
                        <label htmlFor="user_email" className='block text-sm font-medium mb-2 ps-2'>
                            Email
                        </label>
                        <input 
                            type="email" 
                            id='user_email' 
                            className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800' 
                            placeholder='Enter here'
                            name='user_email'
                            value={data.email}
                            onChange={(e)=> {setData({...data, email:e.target.value})}} 
                        />
                    </div>


                    {/* password */}
                    <div className='mt-3'>
                        <label htmlFor="user_password" className='block text-sm font-medium mb-2 ps-2'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            id='user_password' 
                            className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800' 
                            placeholder='Enter here' 
                            name='user_password'
                            value={data.password}
                            onChange={(e)=> {setData({...data, password:e.target.value})}}
                        />
                    </div>


                    {/* about
                    <div className='mt-3'>
                        <label htmlFor="user_about" className='block text-sm font-medium mb-2 ps-2'>
                            About
                        </label>
                        <textarea 
                            id='user_about' 
                            className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800' 
                            rows={8}
                            placeholder='Enter here' 
                        ></textarea>
                    </div> */}

                    <div className="mt-3 text-center">
                        <button type='submit' className='px-3 py-2 bg-green-600 hover:bg-green-800 rounded'>Signup</button>
                        <button onClick={resetForm} type='button' className='px-3 py-2 bg-orange-600 hover:bg-orange-800 rounded ms-3'>Reset</button>
                    </div>

                    {/* {JSON.stringify(data)} */}

                </form>

            </div>
        </div>

    </div>
  )
}

export default Signup