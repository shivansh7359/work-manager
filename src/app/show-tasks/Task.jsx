"use client"

import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx";

const Task = ({task, deleteTaskParent}) => {
  
    const context = useContext(UserContext)

    function deleteTask(taskId){
        deleteTaskParent(taskId)
    }

    return (
    
        <div className={`shadow-lg mt-2 rounded-md ${task.status == "completed" ? "bg-green-800" : "bg-gray-800"}`}>
            <div className='p-3'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold'>{task.title}</h1>
                    <span onClick={() => {
                        deleteTask(task._id)
                    }} className='shadow-lg bg-gray-950 rounded-full h-7 w-7 flex justify-center items-center cursor-pointer hover:bg-gray-900'><RxCross1 /></span>
                </div>
                <p className='font-normal'>{task.content}</p>
                <div className='flex justify-between mt-3'>
                    <p className='text-left'>Status: <span className='font-bold'> {task.status} </span></p>
                    <p className='text-right'>Author: <span className='font-bold'> {context.user?.name} </span></p>
                </div>
            </div>
        </div>
    )
}

export default Task