import fs from "fs";
import http from "http";

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    const file = fs.readFileSync("./public/index.html", "utf-8");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
    return;
  }

  if (request.url?.endsWith(".css")) {
    response.writeHead(200, { "Content-Type": "text/css" });
  }

  const responseContent = fs.readFileSync(`./public/index.css`, "utf-8");
  response.end(responseContent);
});

server.listen(8000, () => console.log("Server running on port 8000"));
