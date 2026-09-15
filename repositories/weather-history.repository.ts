import { pool } from "../db/pool";

type SortBy = "city" | "searched_at";
type SortOrder = "ASC" | "DESC";

export const getWeatherHistory = async (
    userId: number,
    limit: number,
    offset: number,
    sortBy: SortBy,
    order: SortOrder
) => {
    const result = await pool.query(
        `
        SELECT *
        FROM weather_history
        WHERE user_id = $1
        ORDER BY ${sortBy} ${order}
        LIMIT $2
        OFFSET $3
        `,
        [userId,limit,offset]
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
