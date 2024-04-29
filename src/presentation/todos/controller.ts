import { Request, Response } from "express";

export const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy banana", completedAt: new Date() },
  { id: 3, text: "Buy meat", completedAt: null },
];

export class TodosController {
  constructor() {}

  public static getTodos(request: Request, response: Response) {
    return response.status(200).send(todos);
  }

  public static getTodosById(request: Request, response: Response) {
    const { id } = request.params;

    if (isNaN(+id))
      return response.status(400).send("The argument id should be a number");

    const todoById = todos.find((todo) => todo.id === +id);

    todoById
      ? response.status(200).send(todoById)
      : response.status(404).send(`Todo with ${id} not found`);
  }

  public static async createTodo(request: Request, response: Response) {
    const { text } = request.body;

    if (!text) return response.status(400).send("Text is required");

    try {
      const newTodo = { id: todos.length + 1, text, completedAt: new Date() };

      todos.push(newTodo);

      newTodo
        ? response.status(200).send(newTodo)
        : response.status(404).send(`Error`);
    } catch (error) {
      console.log(error);
    }
  }

  public static async updateTodo(request: Request, response: Response) {
    const { id } = request.params;
    const { text, completedAt } = request.body;

    if (!text) return response.status(400).send("Text is required");

    if (isNaN(+id))
      return response.status(400).send("The argument id should be a number");

    try {
      const todo = todos.find((todo) => todo.id === +id);

      if (!todo)
        return response.status(400).send(`Todo with id ${id} doesn't exist`);

      todo.text = text || todo.text;

      completedAt === "null"
        ? (todo.completedAt = null)
        : (todo.completedAt = new Date(completedAt || todo.completedAt));

      return response.status(200).send(todo);
    } catch (error) {
      console.log(error);
    }
  }

  public static async deleteTodo(request: Request, response: Response) {
    const { id } = request.params;

    if (isNaN(+id))
      return response.status(400).send("The argument id should be a number");

    try {
      const todo = todos.find((todo) => todo.id === +id);

      if (!todo)
        return response.status(400).send(`Todo with id ${id} doesn't exist`);

      todos.splice(todos.indexOf(todo), 1);

      return response
        .status(200)
        .send({ msg: `Todo with id ${id} was deleted` });
    } catch (error) {
      console.log(error);
    }
  }
}
