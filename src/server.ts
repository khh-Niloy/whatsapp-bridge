import { envVars } from "./app/config/env";
import { app } from "./app";
import { Server } from "socket.io";
import { createServer } from "http";
import { wpClient } from "./app/wp-socket/whatsapp.client";

const httpServer = createServer(app);
const io = new Server(httpServer);

const startServer = async () => {
  try {
    wpClient.initialize();
    httpServer.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};

(async () => {
  await startServer();
})();
