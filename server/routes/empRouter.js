import express from "express";
import { empCreate } from "../controllers/employeeController.js";

console.log("✅ empRouter loaded");

const router = express.Router();

router.post("/empCreate", empCreate);

export default router