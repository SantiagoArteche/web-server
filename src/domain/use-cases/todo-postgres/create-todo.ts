import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
  execute: (dto: CreateTodoDTO) => Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  public execute = (dto: CreateTodoDTO) => {
    return this.repository.create(dto);
  };
}
