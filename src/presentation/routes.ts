import { Router } from "express";
import { TodosRoutes } from "./todos/routes";
import { TodosRoutesPostgres } from "./todos-postgres/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodosRoutes.routes);

    router.use("/api/todospost", TodosRoutesPostgres.routes);

    return router;
  }
}
