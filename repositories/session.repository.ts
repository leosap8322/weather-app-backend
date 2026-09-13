import { pool } from "../db/pool";
import { generateSessionId } from "../utils/session";


export const createSession = async (userId: number): Promise<string> => {
    const sessionId = generateSessionId();
    const result = await pool.query(
        `
        INSERT INTO sessions (id, user_id)
        VALUES ($1, $2)
        RETURNING *
        `,
        [sessionId, userId]
    );
    return result.rows[0].id;
};

export const findSessionById = async (sessionId: string) => {
    const result = await pool.query(
        ` 
        SELECT *
        FROM sessions
        WHERE id = $1

        `,
        [sessionId]
    );  
    return result.rows[0];
};

export const deleteSession = async (sessionId: string) => {
    await pool.query(
        `
        DELETE FROM sessions
        WHERE id = $1
        `,
        [sessionId]
    );
};