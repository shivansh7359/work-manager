import { Task } from "../../../models/task" 
import { NextResponse } from "next/server"
import { connectDB } from "../../../helper/db"
import jwt from "jsonwebtoken"




//create new task
export async function POST(request){
    try{

        const{title, content, userId, status} = await request.json()

        const authToken = request.cookies.get("authToken")?.value
        // console.log(authToken);
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        // console.log(data);
        

        const task = new Task({
            title, content, userId:data._id, status,
        })

        await connectDB()
        const savedtask = await task.save()

        return NextResponse.json({
            message: "Task created successfully",
            task: savedtask,
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

//get all tasks
export async function GET(request){
    try{

        await connectDB()
        const tasks = await Task.find()

        return NextResponse.json(tasks)

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}





