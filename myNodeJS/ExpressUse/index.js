import http from "http";
import express from "express";

const app=express();
const port = 4000;

app.get("/", (req, res) => {
  res.end("<h1>Home Page GET </h1>");
});

app.post("/", (req, res) => {
  res.end("<h1>Home Page POST</h1>");
});

app.get("/about", (req, res) => {
  res.end("<h1>About Page GET</h1>");
});

app.post("/about", (req, res) => {
  res.end("<h1>About Page POST</h1>");
});

//   function myFunction (req, res) {
// //   console.log(req.url, "url");
//   switch (req.url) {
//     case "/":
//       switch (req.method) {
//         case "GET":
//           res.end("<h1>Home Page GET </h1>");
//           break;
//         case "POST":
//           res.end("<h1>Home Page POST</h1>");
//           break;
//       }
//       break;
//     case "/about":
//       switch (req.method) {
//         case "GET":
//           res.end("<h1>About Page GET</h1>");
//           break;
//         case "POST":
//           res.end("<h1>About Page POST</h1>");
//           break;
//       }
//       break;
//     default:
//       res.end("<h1>Page Not Found</h1>");
//   }
// }
// const createServer = http.createServer(app);

// createServer.listen(port, () => console.log("server running...."));


app.listen(port, () => console.log("my server running...."));