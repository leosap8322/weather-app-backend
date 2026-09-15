import { AppError } from "../errors/AppError.js";
import { createWeatherHistory, getWeatherHistory } from "../repositories/weather-history.repository.js";



export const getUserWeatherHistory = async (
    userId: number,
    page: number,
    limit: number,
    sort: string,
    order: string
) => {
    
    if (sort !== "city" && sort !== "date") {
        throw new AppError("Invalid sort parameter", 400);
    }

    if (order !== "asc" && order !== "desc") {
        throw new AppError("Invalid order parameter", 400);
    }

    const sortMap = {
        city: "city",
        date: "searched_at"
    };

    const orderMap = {
        asc: "ASC",
        desc: "DESC"
    };

    const sortBy = sortMap[sort];
    const sortOrder = orderMap[order];

    const offset = (page - 1) * limit;

    const history = await getWeatherHistory(userId,limit,offset,sortBy,sortOrder);
    return history;
};

export const createUserWeatherHistory = async (
    userId: number,
    city: string
) => {
   return await createWeatherHistory(userId, city);
};