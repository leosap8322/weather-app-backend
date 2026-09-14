import { PoolClient } from "pg";
import { pool } from "../db/pool";
import { AppError } from "../errors/AppError";


export const createFavorite = async (userId: number, city: string) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO favorites (user_id, city)
            VALUES ($1, $2)
            RETURNING *
            `,
            [userId, city]
            
        );
        return result.rows[0];
    }  catch (error) {
        if (error && 
            typeof error === "object" &&
            "code" in error && error.code === "23505"
        ) {
            throw new AppError("Favorite city already exists", 409);
        }

        throw error;
    }
}

export const createFavoriteWithClient = async (client: PoolClient, userId: number, city: string) => {

    try {
        const result = await client.query(
            `
            INSERT INTO favorites (user_id, city)
            VALUES ($1, $2)
            RETURNING *
            `,
            [userId, city]
        );

        return result.rows[0];
    
    } catch (error) {
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "23505"
        ) {
            throw new AppError("Favorite city already exists", 409);
        }

        throw error;
    }
} 

export const getFavorites = async (userId: number) => {
    const result = await pool.query(
        `
        SELECT *
        FROM favorites
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );
    return result.rows;
}
      
export const deleteFavorite = async (
    favoriteId: number,
    userId: number
) => {
    const result = await pool.query(
        `
        DELETE FROM favorites
        WHERE id = $1 AND user_id = $2
        RETURNING *
        `,
        [favoriteId, userId]
    );
    return result.rows[0];
}