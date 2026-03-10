import { Router } from "express";
import { messageRoutes } from "./app/module/message.routes";

export const routes = Router();

const allRoutes = [
  {
    path: "/messages",
    route: messageRoutes,
  },
];

allRoutes.forEach(({ path, route }) => routes.use(path, route));
