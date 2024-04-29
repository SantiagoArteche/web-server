export class CreateTodoDTO {
  private constructor(
    public readonly text: string,
    public readonly completedAt?: Date
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDTO?] {
    const { text, completedAt } = props;

    const newDate = completedAt === "null" ? undefined : new Date();

    if (!text) return ["Text property is required", undefined];

    return [undefined, new CreateTodoDTO(text, newDate)];
  }
}
