import { v4 } from "uuid"

export const createAndSaveUserId = (): string => {
    const userId = v4();
    localStorage.setItem("userId", userId);
    return userId;
}

export const getUserId = (): string => {
    return localStorage.getItem("userId") || createAndSaveUserId();
}