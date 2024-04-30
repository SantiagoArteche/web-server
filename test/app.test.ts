import { Server } from "../src/presentation/server";

jest.mock("../src/presentation/server");

describe("app test", () => {
  test("should call server with arguments and start", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({ routes: expect.any(Function) });
  });
});
