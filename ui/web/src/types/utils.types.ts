import { ThumbnailStatusCode } from "enums/enums";

export interface IThumbnailItem {
    id: string;
    caption?: string;
    captionVietnamese?: string;
    imageURL?: string;
    statusCode: ThumbnailStatusCode;
    audioENLink?: string;
    audioVILink?: string;
    uploadedAt?: string;
    updatedAt?: string;
    fileType?: string;
}