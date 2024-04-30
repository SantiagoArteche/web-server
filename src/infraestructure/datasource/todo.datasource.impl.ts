import { prisma } from "../../data/postgres";
import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDTO,
} from "../../domain";

export class TodoDatasourceImplementation implements TodoDatasource {
  async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    console.log(todos);

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: string): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) throw `Todo with id ${id} not found`;

    return TodoEntity.fromObject(todo);
  }

  async updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: string): Promise<TodoEntity> {
    await this.findById(id);

    const deleted = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObject(deleted);
  }
}
