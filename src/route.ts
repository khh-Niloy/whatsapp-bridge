import { Router } from "express";
import { messageRoutes } from "./app/module/message.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/contents",
    route: messageRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
