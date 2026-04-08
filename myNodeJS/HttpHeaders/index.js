import express from "express";
import multer from "multer"

const app = express();
const PORT=process.env.PORT||5000;
const upload=multer();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", (req, res) => {
console.log(req.headers,"headers")
res.setHeader("x-custom-header", "custom-value");
  res.send("Hello World!");
});

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))