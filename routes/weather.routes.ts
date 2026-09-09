import express from "express";
import { getWeatherDataController } from "../controllers/weather.controller"; 
import { validateCity } from "../middleware/validate-city";
import { validateUserId } from "../middleware/validate-user-id";

const weatherRouter = express.Router();

weatherRouter.get("/", validateCity, validateUserId, getWeatherDataController);

export default weatherRouter;