import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department:{
        type: String,
    },
    salary: {
        type: Number
    }
}, { timestamps: true } );

export const Employee = mongoose.model("Employee", employeeSchema)