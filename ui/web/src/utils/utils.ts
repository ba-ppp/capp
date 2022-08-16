import { ThumbnailStatusCode } from "enums/enums";
import { isEmpty, isNil } from "lodash";
import { v4 } from "uuid"

export const createAndSaveUserId = (): string => {
    const userId = v4();
    localStorage.setItem("userId", userId);
    return userId;
}

export const getUserId = (): string => {
    return localStorage.getItem("userId") || createAndSaveUserId();
}

export const getStatusText = (statusCode: ThumbnailStatusCode): string => {
    switch (statusCode) {
        case ThumbnailStatusCode.DRAFT:
            return "Draft";
        case ThumbnailStatusCode.AI_PROCESSING:
            return "AI Processing";
        case ThumbnailStatusCode.UPLOADING:
            return "Uploading";
        default:
            return "Error";
    }
}

export const isErrorItem = (statusCode: ThumbnailStatusCode): boolean => {
    if (isNil(statusCode)) {
        return true;
    }
    console.log(typeof ThumbnailStatusCode.ERROR);
    return statusCode === ThumbnailStatusCode.ERROR;
}

export const getFileTypeText = (fileType?: string): string => {
    const type = fileType?.split("/")[1];
    if (isEmpty(type) || isNil(type)) {
        return "";
    }
    return type.toUpperCase();
}