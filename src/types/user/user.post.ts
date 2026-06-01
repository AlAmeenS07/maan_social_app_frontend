

export type PostUploadData = {
    content : string;
    media : string[];
}

export type PostResponse = {
    id: string;
    userId: string;
    content: string;
    media: string[];
    hashtags: string[];
    isListed: boolean;
    isDeleted: boolean;
    createdAt: Date;
}