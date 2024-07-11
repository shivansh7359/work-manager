"use client"

import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../../service/userService'
import { useRouter } from 'next/navigation'
import UserContext from '@/context/userContext'

const Login = () => {

    const router = useRouter()
    const context = useContext(UserContext)

    let[data, setData] = useState({
        email: "",
        password: ""
    })

    const doLogin = async(e) => {
        e.preventDefault()

        if(data.email.trim() === "" || data.password.trim() === ""){
            toast.info("Invalid email or password", {
                position:'top-center'
            })
        }

        try{
            const result = await login(data)
            // console.log(result)

            toast.success("Logged in Successfully !!")
            context.setUser(result.user)
            router.push("/profile/user")
            
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message, {
                position: 'top-center'
            })
        }

    }


    const resetForm = () => {
        setData({
            email: "",
            password: ""
        })
    }


  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5 '>
            <div className='py-5'>
                
                <h1 className='text-3xl text-center'>Login Here </h1>

                <form action="#!" className='mt-5' onSubmit={doLogin}>

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

                    <div className="mt-3 text-center">
                        <button type='submit' className='px-3 py-2 bg-green-600 hover:bg-green-800 rounded'>Login</button>
                        <button onClick={resetForm} type='button' className='px-3 py-2 bg-orange-600 hover:bg-orange-800 rounded ms-3'>Reset</button>
                    </div>

                    {/* {JSON.stringify(data)} */}

                </form>

            </div>
        </div>

    </div>
  )
}

export default Login