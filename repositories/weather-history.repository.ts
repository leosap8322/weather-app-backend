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