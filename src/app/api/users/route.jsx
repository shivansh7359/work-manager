import { NextResponse } from "next/server"
import {connectDB} from '@/helper/db'
import { User } from "@/models/user"
import { Task } from "@/models/task"
import bcrypt from "bcrypt"



//create new user
export async function POST(request){

    try{
        //fetch user detail from request
        const {name, email, password} = await request.json()
        
        //create user object with user model
        const user = new User({
            name, email, password
        }) 

        user.password = await bcrypt.hash(user.password, 10)

        await connectDB()
        //save the user
        const createdUser = await user.save()

        const response = NextResponse.json({
            user,
            status: 201
        })

        return response
    }
    catch(error){
        console.log(error);        
        return NextResponse.json({
            message: "Failed to create user !!",
            success: false 
        }, {
            status: 500
        })
    }
}

//get all users
export async function GET(){
    
    let users = []
    try{
        
        await connectDB()
        users = await User.find().select("-password")

        return NextResponse.json(users)

    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}


