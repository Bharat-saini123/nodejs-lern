import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import connectDB from "./database/connection.js";
import UserData from "./models/User.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import dashboard from "./controllers/dashboard.js";
import auth from "./middleware/Auth/auth.js";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.get("/api/dashboard", auth, dashboard);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
