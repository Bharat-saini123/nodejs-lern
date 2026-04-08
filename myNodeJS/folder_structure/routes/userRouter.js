import express from "express";
import getUser from "../controllers/getUser.js";
import getAllUsers from "../controllers/getAllUser.js";
import createUser from "../controllers/createUser.js";
const router = express.Router();

router.get("/:id", getUser);

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
