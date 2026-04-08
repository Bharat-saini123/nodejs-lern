import express from "express";
import connectDB from "./connect_db.js";
import Users from "./createSchema.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/createUser", async (req, res) => {
  const { firstName, lastName, email, phone, gender } = req.body;
  try {
    const user = new Users({
      firstName,
      lastName,
      email,
      phone,
      gender,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch {
    res.status(400).json({ message: "Error creating user" });
  }
});

app.get("/getUser", async (req, res) => {
  try {
    const users = await Users.find();
    const html = `<html><body><h1>Users</h1><ul>${users
      .map(
        (user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`
      )
      .join("")}</ul></body></html>`;
    res.status(200).send(html);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
});

app.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    const html = `<html><body><h1>User Details</h1><p>${user.firstName} ${user.lastName} - ${user.email}</p></body></html>`;
    res.status(200).send(html);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
});
// app.get("/getOne", async (req, res) => {
//   try {
//     const user = await Users.findOne();
//     const html = `<html><body><h1>User Details</h1><p>${user.firstName} ${user.lastName} - ${user.email}</p></body></html>`;
//     res.status(200).send(html);
//   } catch (error) {
//     res.status(400).json({ message: "Error fetching users" });
//   }
// });
app.get("/getOne", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await Users.findOne({ _id: id });
    const html = `<html><body><h1>User Details</h1><p>${user.firstName} ${user.lastName} - ${user.email}</p></body></html>`;
    res.status(200).send(html);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
});

app.patch("/updateUser", async (req, res) => {
  const { firstName, lastName } = req.body;
  const { id } = req.query;
  try {
    const user = await Users.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error fetching users" });
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { id } = req.query;
  try {
    await Users.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user" });
  }
});

app.listen(PORT, () => console.log("server is running on port", PORT));
