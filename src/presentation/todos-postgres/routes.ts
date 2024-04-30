import { Router } from "express";

import { TodoDatasourceImplementation } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImplementation } from "../../infraestructure/repositories/todo.repository.implementation";
import { TodoControllerPostgres } from "./controller";
import { TodoControllerPostgresUseCases } from "./controller-use-cases";

export class TodosRoutesPostgres {
  static get routes(): Router {
    const router = Router();

    const dataSource = new TodoDatasourceImplementation();

    const todoRepository = new TodoRepositoryImplementation(dataSource);

    const todoController = new TodoControllerPostgresUseCases(todoRepository);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);

    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
