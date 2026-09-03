import "dotenv/config";
import express from "express";
import favoritesRouter from "./routes/favorites.route";
import weatherRouter from "./routes/weather.route";
import { errorHandler } from "./middleware/error-handler";

const app = express();

const logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);
app.use(express.json());

app.use("/api/favorites", favoritesRouter);
app.use("/api/weather", weatherRouter);

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});