import dotenv from "dotenv";
dotenv.config();

interface IEnvVars {
  PORT: string;
}

const loadEnvVars = (): IEnvVars => {
  const requiredEnvVar: string[] = ["PORT"];
  requiredEnvVar.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`env not found error -> ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
  };
};

export const envVars = loadEnvVars();
