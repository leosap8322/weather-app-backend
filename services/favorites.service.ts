import { pool } from "../db/pool";
import {
    createFavorite as createFavoriteRepository,
    getFavorites as getFavoritesRepository,
    deleteFavorite as deleteFavoriteRepository,
    createFavoriteWithClient
} from "../repositories/favorites.repository";

export const createFavorite = async (userId: number, city: string) => {
    
    return await createFavoriteRepository(userId, city);

};

export const getFavorites = async (userId: number) => {
    return await getFavoritesRepository(userId);
}

export const deleteFavorite = async (favoriteId: number, userId: number) => {
    return await deleteFavoriteRepository(favoriteId, userId);
}

export const importFavorites = async (userId: number, cities: string[]) => {
    const client = await pool.connect();
    const favorites = []

    try {
        await client.query("BEGIN");

        for (const city of cities) {
            const favorite = await createFavoriteWithClient(client, userId, city);
            favorites.push(favorite);
        }

        await client.query("COMMIT");

        return favorites;
        
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }

}