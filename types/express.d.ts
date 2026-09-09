declare global {
    namespace Express {
        interface Request {
            city: string;
            userId: number;
        }
    }
}

export {};