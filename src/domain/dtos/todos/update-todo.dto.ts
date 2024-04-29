export class UpdateTodoDTO {
  constructor(
    public readonly id: string,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id) return ["Id is required", undefined];

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["Completed at must be a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)];
  }
}
