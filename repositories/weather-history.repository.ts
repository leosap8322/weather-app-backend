import { pool } from "../db/pool";

export const getWeatherHistory = async (userId: number) => {
    const result = await pool.query(
        `
        SELECT *
        FROM weather_history
        WHERE user_id = $1
        ORDER BY searched_at DESC
        `,
        [userId]
    );

    return result.rows;
};

export const createWeatherHistory = async (
    userId: number,
    city: string
) => {
    const result = await pool.query(
        `
        INSERT INTO weather_history (user_id, city)
        VALUES ($1, $2)
        RETURNING *
        `,
        [userId, city]
    );
    return result.rows[0];
};