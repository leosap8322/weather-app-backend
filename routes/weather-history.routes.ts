import express from "express";
import { getWeatherHistoryController } from "../controllers/weather-history.controller";
import { validateUserId } from "../middleware/validate-user-id";

export const weatherHistoryRouter = express.Router();

weatherHistoryRouter.get("/", validateUserId, getWeatherHistoryController);