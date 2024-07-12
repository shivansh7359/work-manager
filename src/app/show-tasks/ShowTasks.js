"use client"

import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTasksOfUser } from "@/service/taskService"
import UserContext from "@/context/userContext"
import Task from "./Task"
import { toast } from 'react-toastify'

const ShowTasks = () => {

    const context = useContext(UserContext)
    const[tasks, setTasks] = useState([])

    async function loadTasks(userId){
        try{
            const tasks = await getTasksOfUser(userId);
            setTasks([...tasks].reverse());
            // console.log(tasks);            
        }
        catch(error){
            console.log(error);
            
        }
    }   
    useEffect(() => {
        if(context.user){
            loadTasks(context.user._id)
        }
    }, [context.user])

    async function deleteTaskParent(taskId){
        try{
            const result = await deleteTask(taskId)
            // console.log(result)
            const newTasks = tasks.filter(item => item._id != taskId)
            setTasks(newTasks)
            toast.success("Task deleted !!")
        }
        catch(error){
            console.log(error);
            toast.error("Error in deleting task !!")            
        }
    }


    return (
    <div className='grid grid-cols-12 mt-3'>
        <div className='col-span-6 col-start-4 '>
            <h1 className='text-2xl mb-2'>Your Tasks ( {tasks.length} )</h1>

            {
                tasks.map((task) => {
                    return(
                        <Task task={task} deleteTaskParent={deleteTaskParent} key={task._id}/>
                    )
                })
            }

        </div>
    </div>
  )
}

export default ShowTasks