import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoByIdUseCase {
  execute: (id: string) => Promise<TodoEntity>;
}

export class GetTodo implements GetTodoByIdUseCase {
  constructor(private readonly repository: TodoRepository) {}

  public execute = (id: string) => {
    return this.repository.findById(id);
  };
}
