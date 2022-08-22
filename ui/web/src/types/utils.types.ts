import { ThumbnailStatusCode } from "enums/enums";

export interface IThumbnailItem {
    id: string;
    caption?: string;
    imageURL?: string;
    statusCode: ThumbnailStatusCode;
    uploadedAt?: string;
    updatedAt?: string;
    fileType?: string;
}