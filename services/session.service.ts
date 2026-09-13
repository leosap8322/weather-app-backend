import { createSession, deleteSession as deleteSessionRepository } from "../repositories/session.repository";

export const startSession = async (userId: number): Promise<string> => {
    const sessionId = await createSession(userId);

    return sessionId;
};

export const deleteSession = async(sessionId: string): Promise<void> => {
    await deleteSessionRepository(sessionId);
}