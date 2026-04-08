import express from "express";
import createUser from "../controllers/createUser.js";
import login from "../controllers/login.js";
const router = express.Router();

router.post("/createUser", createUser);
router.get("/login", login);

export default router;
