import express from "express";
import multer from "multer";
const PORT = process.env.PORT || 7000;
const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Middleware executed");
  return res.json({
    res: "middleware block",
  });
});
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});
app.get("/", (req, res) => {
  res.json("Hello World");
});
app.post("/upload/:id", upload.single("photo"), (req, res) => {
  //   console.log(req.ip, "ip");
  //   console.log(req.path, "path");
  //   console.log(req.method, "method");
  //   console.log(req.headers, "headers");
  //   console.log(req.params, "params");
  //   console.log(req.query, "query");
  const getFile = req.file;
  console.log(getFile, "get");
  res.json({
    res: "file uploadeed",
  });
});
app.listen(PORT, () => console.log("server running on port", PORT));
