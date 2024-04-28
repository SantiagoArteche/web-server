import fs from "fs";
import http2 from "http2";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (request, response) => {
    if (request.url === "/") {
      const file = fs.readFileSync("./public/index.html", "utf-8");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
      return;
    }

    if (request.url?.endsWith(".css")) {
      response.writeHead(200, { "Content-Type": "text/css" });
    }

    try {
      const responseContent = fs.readFileSync(`./public/index.css`, "utf-8");
      response.end(responseContent);
    } catch (error) {
      response.writeHead(404, { "Content-Type": "text.html" });
      response.end();
    }
  }
);

server.listen(8000, () => console.log("Server running on port 8000"));
