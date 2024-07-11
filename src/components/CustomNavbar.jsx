"use client";

import UserContext from '@/context/userContext';
import { logout } from '@/service/userService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify';

const CustomNavbar = () => {

    const context = useContext(UserContext)
    // console.log(context);
    
    const router = useRouter()

    async function doLogout(){
        try{
            const result = await logout()
            // console.log(result);
            context.setUser(undefined)
            router.push("/")
        }   
        catch(error){
            console.log(error);            
            toast.error("Logout Error")
        }
    } 

    return (
        <nav className='bg-blue-600 h-12 py-2 px-36 text-white flex justify-between items-center '>

            <div className='brand'>
                <h1 className='text-xl font-semibold'><a href="#!">Work Manager</a></h1>
            </div>
            <div >
                <ul className='flex space-x-5'>
                    {
                        context.user && (
                            <>
                                <li>
                                    <Link href={"/"} className='hover:text-purple-950'>Home</Link>
                                </li>
                                <li>
                                    <Link href="/add-task" className='hover:text-purple-950'>Add Task</Link>
                                </li>
                                <li>
                                    <Link href="/show-tasks" className='hover:text-purple-950'>Show Task</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div>
                <ul className='flex space-x-3'>
                    {
                        context.user && (
                            <>
                                <li><Link href={"#!"}>{context.user.name}</Link></li>
                                <li><button onClick={doLogout} className='hover:text-purple-950'>Logout</button></li>
                            </>
                        )
                    }
                    {
                        !context.user && (
                            <>
                                <li><Link href="/login" className='hover:text-purple-950'>Login</Link></li>
                                <li><Link href="/signup" className='hover:text-purple-950'>Signup</Link></li>
                            </>
                        )
                    }
                </ul>
            </div>

        </nav>
    )
}

export default CustomNavbar