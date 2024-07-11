import {NextResponse} from "next/server"
import {User} from "../../../../models/user"

//get single user
export async function GET(request, {params}){
    try{

        const {userId} = params

        await connectDB()
        const user = await User.findById(userId).select("-password")

        return NextResponse.json(user)

    }
    catch(error){
        console.log(error);        
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}

//update single user
export async function PUT(request, {params}){
    try{

        const {userId} = params;

        const {name, password} = await request.json()

        const user = await User.findById(userId)

        user.name = name
        user.password = password

        await connectDB()
        const updatedUser = await user.save()

        return NextResponse.json(updatedUser)

    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: error,
            status: 500
        })
    }
}

//delete user
export async function DELETE(request, {params}){

    try{

        const{userId} = params;

        await connectDB()
        await User.deleteOne({
            _id: userId
        })

        return NextResponse.json({
            message: "User deleted",
            success: true,
        })

    }
    catch(error){
        console.log(error);        
        return NextResponse.json({
            message: error,
            status: 500
        })
    }

    return NextResponse.json({
        message: "testing delete"
    })
    
    
}
