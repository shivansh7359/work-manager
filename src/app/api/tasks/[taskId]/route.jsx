import { NextResponse } from "next/server"
import { Task } from "@/models/task"
import { connectDB } from "@/helper/db"



//get single task
export async function GET(request, {params}){
    try{

        const {taskId} = params

        await connectDB()
        const task = await Task.findById(taskId)

        return NextResponse.json(task)       

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}

//update single task
export async function PUT(request, {params}){
    try{

        const{taskId} = params

        const{title, content, status} = await request.json()
        
        let task = await Task.findById(taskId)
        
        task.title = title
        task.content = content
        task.status = status
        
        await connectDB()
        const updatedTask = await task.save()

        return NextResponse.json(updatedTask)        

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}

//delete single task
export async function DELETE(request, {params}){
    try{

        const{taskId} = params

        await connectDB()
        await Task.deleteOne({
            _id: taskId
        })

        return NextResponse.json({
            message: "Deleted Successfully",
            status: 200,
            success: true
        })

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}


