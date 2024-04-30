import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "stream/consumers";

describe("todo routes tests", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });
  const todo1 = { text: "Text1" };
  const todo2 = { text: "Text2" };

  test("should return TODOs", async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const response = await request(testServer.app)
      .get("/api/todospost")
      .expect(200);

    const body = response.body;

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBe(null);
  });

  test("should return a TODO", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const response = await request(testServer.app)
      .get(`/api/todospost/${todo.id}`)
      .expect(200);

    const body = response.body;

    expect(body.text).toBe(todo.text);
    expect(body.completedAt).toBe(todo.completedAt);
  });

  test("should return not found if TODO not found", async () => {
    const todoId = 9898;
    const { body } = await request(testServer.app)
      .get(`/api/todospost/${todoId}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("should return a new TODO", async () => {
    const { body } = await request(testServer.app)
      .post(`/api/todospost`)
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(String),
      text: todo1.text,
      completedAt: expect.any(String) || null,
    });
  });

  test("should return an if text is not valid", async () => {
    const { body } = await request(testServer.app)
      .post(`/api/todospost`)
      .send({})
      .expect(400);

    expect(body).toEqual({
      error: "Text property is required",
    });
  });

  test("should an updated TODO", async () => {
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .put(`/api/todospost/${todo.id}`)
      .send({ text: "updated TODO", completedAt: "2023-10-21" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(String),
      text: "updated TODO",
      completedAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should return 404 if TODO not found", async () => {
    const { body } = await request(testServer.app)
      .put(`/api/todospost/9292929`)
      .send({ text: "updated TODO", completedAt: "2023-10-21" })
      .expect(400);

    expect(body).toEqual({ error: "Todo with id 9292929 not found" });
  });

  test("should an updated TODO only the date", async () => {
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .put(`/api/todospost/${todo.id}`)
      .send({ completedAt: "2023-10-21" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(String),
      text: todo1.text,
      completedAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should delete a TODO ", async () => {
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .delete(`/api/todospost/${todo.id}`)
      .expect(200);

    console.log({ body });

    expect(body).toEqual({
      id: expect.any(String),
      text: todo1.text,
      completedAt: null,
    });
  });

  test("should return 404 if TODO do not exist", async () => {
    const { body } = await request(testServer.app)
      .delete(`/api/todospost/999`)
      .expect(400);

    expect(body).toEqual({
      error: "Todo with id 999 not found",
    });
  });
});
