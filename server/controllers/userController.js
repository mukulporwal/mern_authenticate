import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js"


// Register----------
export const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: "Please fill all fields"});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch(err){
        res.status(500).json({ message: "Server error" });
    };
};

// Login----------
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({message: "Login successful", token})
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// -----------------
export const getMe = async(req, res) => {
    res.status(200).json(req.user)
}

