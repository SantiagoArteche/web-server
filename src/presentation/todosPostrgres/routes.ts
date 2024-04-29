import { Router } from "express";
import { TodoControllerPostgres } from "./controller";

export class TodosRoutesPostgres {
  static get routes(): Router {
    const router = Router();

    router.get("/", TodoControllerPostgres.getTodos);
    router.get("/:id", TodoControllerPostgres.getTodoById);

    router.post("/", TodoControllerPostgres.createTodo);
    router.put("/:id", TodoControllerPostgres.updateTodo);

    router.delete("/:id", TodoControllerPostgres.deleteTodo);

    return router;
  }
}
