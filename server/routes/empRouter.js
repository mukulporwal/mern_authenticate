import express from "express";
import { empCreate, empDelete, empUpdate, getAllEmp, getEmpById } from "../controllers/employeeController.js";

console.log("✅ empRouter loaded");

const router = express.Router();

router.post("/createUser", empCreate);
router.get("/allUser", getAllEmp);
router.get("/user/:id", getEmpById);
router.put("/updateUser/:id", empUpdate)
router.delete("/deleteUser/:id", empDelete)

export default router;