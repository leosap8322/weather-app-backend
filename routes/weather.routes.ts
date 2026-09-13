import express from "express";

import { getWeatherDataController } from "../controllers/weather.controller";
import { validateCity } from "../middleware/validate-city";
import { authMiddleware } from "../middleware/auth";

const weatherRouter = express.Router();

weatherRouter.get(
    "/",
    authMiddleware,
    validateCity,
    getWeatherDataController
);

export default weatherRouter;