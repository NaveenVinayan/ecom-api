import connectToDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt'

const adminRegister = async () =>{
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
        
    }
}


const userRegister = async () =>{
    connectToDatabase()
    try {
        const hashPassword = await bcrypt.hash("user", 10)
        const newUser = new User({
            name: "User",
            email: "user@gmail.com",
            password: hashPassword,
            role: "user"
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
        
    }
}

userRegister();
adminRegister();
