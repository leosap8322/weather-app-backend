declare global {
    namespace Express {
        interface Request {
            city: string;
        }
    }
}

export {};