import express from "express";
import { getUserWeatherHistory } from "../services/weather-history.service";

export const getWeatherHistoryController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const userId = req.userId;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20)

    if (
        !Number.isInteger(page) ||
        page < 1 ||
        !Number.isInteger(limit) ||
        limit < 1 ||
        limit > 100
    ) {
        res.status(400).json({
            error: "Invalid pagination parameters"
        });
        return;
    }


    const sort = req.query.sort ?? "date";
    const order = req.query.order ?? "desc";

    if (
        typeof sort !== "string" ||
        (sort !== "city" && sort !== "date")
    ) {
        res.status(400).json({
            error: "Invalid sort parameter"
        });
        return;
    }

    if (
        typeof order !== "string" ||
        (order !== "asc" && order !== "desc")
    ){
        res.status(400).json({
            error: "Invalid order parameter"
        });
        return;
    }

    try {
        const history = await getUserWeatherHistory(
            userId,
            page,
            limit,
            sort,
            order
        );

        res.status(200).json(history);
    } catch (error) {
        next(error);
    }
};