import { AppError } from "../errors/AppError";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { hashPassword } from "../utils/password";

export const registerUser = async (email: string, password: string) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(email, passwordHash);

    return user;
};  