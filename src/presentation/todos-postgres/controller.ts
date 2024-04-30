import { Request, Response } from "express";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoControllerPostgres {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (request: Request, response: Response) => {
    const allTodos = await this.todoRepository.getAll();

    return response.status(200).send(allTodos);
  };

  public getTodoById = async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) return response.status(400).send("Id is required");

    try {
      const todo = await this.todoRepository.findById(id);

      return response.send(todo);
    } catch (error) {
      return response.status(400).send({ error });
    }
  };

  public createTodo = async (request: Request, response: Response) => {
    const [error, createDto] = CreateTodoDTO.create(request.body);

    if (error) return response.status(400).send({ error });

    const newTodo = await this.todoRepository.create(createDto!);

    return response.status(200).send(newTodo);
  };

  public updateTodo = async (request: Request, response: Response) => {
    const { id } = request.params;
    const [error, updateDto] = UpdateTodoDTO.update({ ...request.body, id });

    if (error) return response.status(400).send({ error });

    try {
      const updateTodo = await this.todoRepository.updateTodo(updateDto!);

      return response.status(200).send(updateTodo);
    } catch (error) {
      return response.status(404).send({ error });
    }
  };

  public deleteTodo = async (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) return response.status(400).send(`Id is required`);

    try {
      await this.todoRepository.deleteById(id);

      return response.status(200).send(`Todo with id ${id} was deleted!`);
    } catch (error) {
      return response.status(404).send({ error });
    }
  };
}
