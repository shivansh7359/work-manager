import mongoose from "mongoose"
require('dotenv').config()
import {User} from '../models/user'

const MONGODB_URL = process.env.MONGO_URL || ''

const config = {
    isConnected: 0,
}

export const connectDB = async() => {
    
    if(config.isConnected){
        return;
    }

    try{
        const {connection} = await mongoose.connect(MONGODB_URL, {
            dbName: 'work_manager',
        })
        // console.log("DB Connected");
        config.isConnected = connection.readyState
        // console.log(connection);     
        // console.log("connected with host " ,connection.host);
        
        //testing creating user
        // const user = new User({
        //     name: "test name",
        //     email: "test@gmail.com",
        //     password: "testpassword"
        // })

        // await user.save()
        // console.log("User is created");        
        

    }catch(error){
        console.log("error connecting DB");
        console.log(error);                
    }


}