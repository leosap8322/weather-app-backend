import { AppError } from "../errors/AppError";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { startSession } from "./session.service";

export const registerUser = async (email: string, password: string) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(email, passwordHash);

    return user;
};  

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const sessionId = await startSession(user.id);

    return sessionId;
};