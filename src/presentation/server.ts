import express from "express";
import "dotenv/config";

export class Server {
  private app = express();
  private readonly port = process.env.PORT ?? 8080;

  async start() {
    this.app.use(express.static("public"));

    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}
