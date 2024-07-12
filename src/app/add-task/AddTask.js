"use client";

import React, { useState } from 'react'
import login from "../../assets/login.svg"
import Image from 'next/image'
import { addTask } from "@/service/taskService"
import { toast } from 'react-toastify';

const AddTask = () => {
  // console.log("this is add-task component");

  const[task, setTask] = useState({
    title: '',
    content: '',
    status: 'none',
    userId: '668cd91d3cb2e17abf046087'
  })

  const handleAddTask = async(e) => {
    e.preventDefault();

    try{

      const result = await addTask(task)
      // console.log(result)
      toast.success("Task Added", {
        position: "top-center",
      })

      setTask({
        title: "",
        content: "",
        status: "none",
      })

    }
    catch(error){
      console.log(error);
      toast.error("Error Occured !!", {
        position: "top-center",
      })
    }
  }

  
  return (
    <div className='grid grid-cols-12 justify-center'>

      <div className='p-5 col-span-4 col-start-5 shadow-sm '>

        <div className='my-8 flex justify-center'>
          <Image src={login} alt='image' style={{
            width:"50%",
          }}/>
        </div>

        <h1 className='text-3xl text-center'>Add your task here</h1>

        <form action="#!" onSubmit={handleAddTask}>

          {/* task title */}
          <div className='mt-4'>
            
            <label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
            
            <input 
              type="text" 
              id='task_title' 
              name='task_title'  
              className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800' 
              value={task.title}
              onChange={(e)=> {setTask({...task, title:e.target.value})}}
            />
          
          </div>

          {/* task content */}
          <div className='mt-4'>
            
            <label htmlFor="task_content" className='block text-sm font-medium mb-2'>Content</label>
            
            <textarea 
              id='task_content'
              rows={5}
              className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
              name='task_content'
              value={task.content}
              onChange={(e)=> {setTask({...task, content:e.target.value})}}
            />
          
          </div>

          {/* task status */}
          <div className='mt-4'>
            
            <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Status</label>

            <select 
              id="task_status"
              className='w-full p-3 rounded-md bg-gray-800 focus:ring-gray-400-100 border border-gray-800'
              name='task_status'
              value={task.status}
              onChange={(e)=> {setTask({...task, status:e.target.value})}}  
            >
              <option value="none" disabled>---Select Status---</option>  
              <option value="pending">pending</option>  
              <option value="completed">completed</option>  
            </select>            
          
          </div>

          {/* button actions */}
          <div className='mt-4 flex justify-center'>
            <button className='bg-blue-600 py-2 px-3 rounded-md hover:bg-blue-800'>Add Task</button>
            <button className='bg-red-600 py-2 px-3 rounded-md hover:bg-red-800 ms-3'>Clear</button>
          </div>

          {/* {JSON.stringify(task)} */}

        </form>

      </div>

    </div>
  )
}

export default AddTask