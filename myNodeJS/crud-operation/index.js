import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express from "express";
import connectDB from "./DB/database/connection.js";
import { User } from "./DB/schema/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "./auth/auth.js";
const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Create user error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/dashboard", Auth, async (req, res) => {
  console.log(req.user,"user")
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Dashboard data retrieved successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(PORT, () => console.log("server is running on port", PORT));
