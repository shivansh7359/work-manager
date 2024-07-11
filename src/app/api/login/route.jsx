import { NextResponse } from "next/server";
import { User } from "../../../models/user";
import {connectDB} from '@/helper/db'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export async function POST(request){

    try{

        // 1 get user
        const{email, password} = await request.json()

        await connectDB()
        const user = await User.findOne({email: email })

        if(user == null){
            throw new Error("User not  found !!")
        }

        const matched = await bcrypt.compare(password, user.password)

        // 2 check password
        if(!matched){
            throw new Error("email or password not matched !!")
        }

        // 3 create token
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_KEY)

        // console.log(token);

        // 4 add cookie
        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
            user: user,
        })

        response.cookies.set("authToken", token, {
            expiresIn: "1d",
            httpOnly: true,
        })

        return response;
    
    }   
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: error.message,
            success: false
        },{
            status: 500
        })
    }


}