import { Request, Response } from "express";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodoControllerPostgresUseCases {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (request: Request, response: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => response.status(200).send(todos))
      .catch((error) => response.status(400).send({ error }));
  };

  public getTodoById = (request: Request, response: Response) => {
    const { id } = request.params;

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => response.status(200).send(todo))
      .catch((error) => response.status(400).send({ error }));
  };

  public createTodo = (request: Request, response: Response) => {
    const [error, createDto] = CreateTodoDTO.create(request.body);

    if (error) return response.status(400).send({ error });

    new CreateTodo(this.todoRepository)
      .execute(createDto!)
      .then((todo) => response.status(200).send(todo))
      .catch((error) => response.status(400).send({ error }));
  };

  public updateTodo = (request: Request, response: Response) => {
    const { id } = request.params;
    const [error, updateDto] = UpdateTodoDTO.update({ ...request.body, id });

    if (error) return response.status(400).send({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateDto!)
      .then((todo) => response.status(200).send(todo))
      .catch((error) => response.status(400).send({ error }));
  };

  public deleteTodo = (request: Request, response: Response) => {
    const { id } = request.params;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => response.status(200).send(todo))
      .catch((error) => response.status(400).send({ error }));
  };
}
