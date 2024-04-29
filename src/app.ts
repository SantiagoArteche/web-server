import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  Main();
})();

function Main() {
  const server = new Server({ routes: AppRoutes.routes });
  server.start();
}
