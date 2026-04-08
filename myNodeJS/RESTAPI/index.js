import express from "express";
import { MockData } from "./MOCK_DATA.js";
import multer from "multer";

const upload = multer();
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/api/user", (req, res) => {
  res.send({ MockData });
});

app.get("/user", (req, res) => {
  const getFirstName = MockData.filter((data) => data.first_name);
  const html = `<ul>${getFirstName
    .map((data) => `<li>${data.first_name}</li>`)
    .join("")}</ul>`;
  res.send(html);
});
app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const user = MockData.find((user) => user.id === parseInt(id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send({ user });
});
app.post("/api/user", (req, res) => {
  const { id, first_name, last_name, email, gender, phone } = req.body;
  if (!id || !first_name || !last_name || !email || !gender || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const getDataById = MockData.find((data) => data.id === parseInt(id));
  if (getDataById) {
    return res.status(400).json({ error: "User with this ID already exists" });
  }
  MockData.push({ id, first_name, last_name, email, gender, phone });
  const findUserIndex = MockData.findIndex((data) => data.id === parseInt(id));
  return res.json({
    data: {
      data1: MockData[findUserIndex],
      data2: MockData[findUserIndex - 1],
    },
  });
});

app.put("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, gender, phone } = req.body;
  const userIndex = MockData.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  MockData[userIndex] = {
    ...MockData[userIndex],
    first_name,
    last_name,
    email,
    gender,
    phone,
  };
  return res.json({
    data: MockData[userIndex],
  });
});
app.patch("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { first_name } = req.body;
  const userIndex = MockData.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  MockData[userIndex] = {
    ...MockData[userIndex],
    first_name,
  };
  return res.json({
    data: MockData[userIndex],
  });
});
app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = MockData.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  MockData.splice(userIndex, 1);
  return res.json({ message: "User deleted successfully" });
});

// app.get("/api/getUser/:id", (req, res) => {
//   const { id } = req.params;
//   const user = MockData.find((user) => user.id === parseInt(id));
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   const html = `<h1>${user.first_name}</h1>`;
//   res.send(html);
// });

app.post("/api/getUser/:id", upload.single("photo"), (req, res) => {
  console.log(req.body,"body");
  console.log(req.file,"file");
  console.log(req.params,"params");
  console.log(req.query,"query");
  console.log(req.headers,"headers");
  const { id } = req.params;
  const user = MockData.find((user) => user.id === parseInt(id));

  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.json({ user });
});

app.listen(PORT, () => console.log("server started ..."));
