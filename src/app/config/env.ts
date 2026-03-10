import dotenv from "dotenv";
dotenv.config();

interface IEnvVars {
  PORT: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
}

const loadEnvVars = (): IEnvVars => {
  const requiredEnvVar: string[] = [
    "PORT",
    "RATE_LIMIT_WINDOW_MS",
    "RATE_LIMIT_MAX",
  ];
  requiredEnvVar.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`env not found error -> ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS),
    RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX),
  };
};

export const envVars = loadEnvVars();
