import { NextResponse } from "next/server"
import { Task } from "@/models/task"
import { connectDB } from "@/helper/db"

//localhost:3000/api/users/[userId]/tasks
//get all tasks of a particular user 
export async function GET(request, { params }) {
    try{
        
        const {userId} = params

        await connectDB()
        const tasks = await Task.find({
            userId: userId
        })

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

