import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
  abstract create(createDto: CreateTodoDTO): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: string): Promise<TodoEntity>;
  abstract updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity>;
  abstract deleteById(id: string): Promise<TodoEntity>;
}
