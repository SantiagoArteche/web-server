import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { todos } from "../todos/controller";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos";

export class TodoControllerPostgres {
  constructor() {}

  public static async getTodos(request: Request, response: Response) {
    const allTodos = await prisma.todo.findMany();

    if (allTodos.length === 0)
      return response.status(400).send("Todos not found");

    return response.status(200).send(allTodos);
  }

  public static async getTodoById(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) return response.status(400).send("Id is required");

    try {
      const todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      });

      if (!todo)
        return response.status(400).send(`Todo with id ${id} not found`);

      return response.status(200).send(todo);
    } catch (error) {
      console.log(error);
    }
  }

  public static async createTodo(request: Request, response: Response) {
    const [error, createDto] = CreateTodoDTO.create(request.body);

    if (error) return response.status(400).send({ error });

    try {
      const newTodo = await prisma.todo.create({
        data: createDto!,
      });

      return response.status(200).send(newTodo);
    } catch (error) {
      console.log(error);
    }
  }

  public static async updateTodo(request: Request, response: Response) {
    const { id } = request.params;
    const [error, updateDto] = UpdateTodoDTO.update({ ...request.body, id });

    if (error) return response.status(400).send({ error });

    try {
      const findTodo = await prisma.todo.findUnique({ where: { id } });

      if (!findTodo)
        return response.status(400).send(`Todo with id ${id} not found`);

      const updateTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: updateDto!.values,
      });

      return response.status(200).send(updateTodo);
    } catch (error) {
      console.log(error);
    }
  }

  public static async deleteTodo(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) return response.status(400).send(`Id is required`);

    try {
      const findTodo = await prisma.todo.findUnique({ where: { id } });

      if (!findTodo)
        return response.status(400).send(`Todo with id ${id} not found`);

      await prisma.todo.delete({
        where: {
          id,
        },
      });

      return response.status(200).send(`Todo with id ${id} was deleted!`);
    } catch (error) {
      console.log(error);
    }
  }
}
