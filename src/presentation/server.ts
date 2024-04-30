import express, { Router } from "express";

interface Options {
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port = process.env.PORT ?? 8080;
  private readonly routes: Router;

  constructor(options: Options) {
    const { routes } = options;
    this.routes = routes;
  }

  async start() {
    //Middlewares
    this.app.use(express.static("public"));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Router
    this.app.use(this.routes);

    //Server
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}
