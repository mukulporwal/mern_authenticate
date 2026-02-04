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

export const getAllEmp = async(req, res) => {
    try {
        const empData = await Employee.find();
        if(!empData || empData.length === 0){
          return res.status(404).json({message: "Employee not found"})
        }
        res.status(200).json(empData)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getEmpById = async(req, res) => {
    try {
        const id = req.params.id;
        const empExist = await Employee.findById(id);
        if(!empExist){
            return res.status(404).json({message: "Employee not found"})
        }
        res.status(200).json(empExist)
    } catch (error) {
       res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

export const empUpdate = async(req, res) => {
    try {
        const id = req.params.id
        const empExist = await Employee.findById(id);
        if(!empExist){
            return res.status(404).json({message: "Employee not found"})
        }
        const updatedData = await Employee.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

export const empDelete = async(req, res) => {
    try {
        const id = req.params.id
        const empExist = await Employee.findById(id);
        if(!empExist){
            return res.status(404).json({message: "Employee not found"})
        }
        await Employee.findByIdAndDelete(id);
        res.status(200).json({message: "Employee deleted successfully"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}