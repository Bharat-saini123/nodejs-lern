import http from "http";
const port = 5000;
const server = http.createServer((req, res) => {
    console.log(req.headers)
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Home Page</h1>");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>About Page</h1>");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});
server.listen(port, () => {
  console.log("server start");
});
