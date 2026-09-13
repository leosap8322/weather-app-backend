import {
    createFavorite as createFavoriteRepository,
    getFavorites as getFavoritesRepository,
    deleteFavorite as deleteFavoriteRepository
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