import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRouter.js"
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5000

const app =  express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})

connectDB();

app.use("/api/users", userRoutes);