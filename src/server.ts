import { envVars } from "./app/config/env";
import { app } from "./app";

const startServer = async () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
  }
};

(async () => {
  await startServer();
})();
