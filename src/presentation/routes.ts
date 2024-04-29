import { Router } from "express";
import { TodosRoutes } from "./todos/routes";
import { TodosRoutesPostgres } from "./todosPostrgres/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodosRoutes.routes);

    router.use("/api/todosP", TodosRoutesPostgres.routes);

    return router;
  }
}
