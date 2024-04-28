import { Server } from "./presentation/server";

(() => {
  Main();
})();

function Main() {
  const server = new Server();
  server.start();
}
