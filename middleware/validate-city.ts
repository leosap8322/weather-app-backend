import express from 'express';

export const validateCity = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
    const city = req.query.city;

    if (typeof city !== 'string' || city.trim() === '') {
        return res.status(400).json({ error: 'City parameter is required and must be a string.' });
    }
    
    req.city = city.trim();

    next();
}