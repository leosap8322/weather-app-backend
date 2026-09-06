import express from "express";
import { getWeatherDataController } from "../controllers/weather.controller"; 
import { validateCity } from "../middleware/validate-city";

const weatherRouter = express.Router();

weatherRouter.get("/", validateCity, getWeatherDataController);

export default weatherRouter;