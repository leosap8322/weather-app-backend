import { pool } from "../db/pool";

export const findUserByEmail = async (email: string) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};

export const createUser = async (email: string, passwordHash: string) => {
    const result = await pool.query(
        `
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING *
        `,
        [email, passwordHash]
    );

    return result.rows[0];
};