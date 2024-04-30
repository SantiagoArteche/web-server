import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from "../../domain";

export class TodoRepositoryImplementation implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  create(createDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createDto);
  }

  findById(id: string): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.updateTodo(updateTodoDto);
  }
  deleteById(id: string): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
