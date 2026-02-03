import { Employee } from "../models/employeeModel.js";

export const empCreate = async(req, res) => {
    try {
        const { name, email, department, salary } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const employee = await Employee.create({
            name, email, department, salary 
        });

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}