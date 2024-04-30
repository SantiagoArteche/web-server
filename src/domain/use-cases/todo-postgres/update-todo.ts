import { UpdateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
  execute: (utd: UpdateTodoDTO) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  public execute = (utd: UpdateTodoDTO) => {
    return this.repository.updateTodo(utd);
  };
}
