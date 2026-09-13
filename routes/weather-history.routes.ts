import express from "express";

import { getWeatherHistoryController } from "../controllers/weather-history.controller";
import { authMiddleware } from "../middleware/auth";

export const weatherHistoryRouter = express.Router();

weatherHistoryRouter.get("/", authMiddleware, getWeatherHistoryController);