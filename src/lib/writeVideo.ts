import { config, databases, storage } from "./appwrite";
import { NewVideoType, UploadVideoType, VideoType } from "../types/VideoTypes";
import { ID, ImageGravity, Query } from "react-native-appwrite";
import { ImagePickerAsset } from "expo-image-picker";

const { databaseId, videoCollectionId, storageId } = config

export const getAllVideos = async (): Promise<VideoType[]> => {
    try {
        const videos = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return videos.documents as unknown as VideoType[];
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

export const getLatestVideos = async (): Promise<VideoType[]> => {
    try {
        const videos = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return videos.documents as unknown as VideoType[];
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

export const searchPosts = async (query: string): Promise<VideoType[]> => {
    try {
        const videos = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return videos.documents as unknown as VideoType[];
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
};

const getFilePreview = async (fileId: string, type: 'image' | 'video'): Promise<string> => {
    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type == 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 100)
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw new Error('Something went wrong getting the file preview');

        return fileUrl;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

const uploadFile = async (file: ImagePickerAsset, type: 'image' | 'video'): Promise<string> => {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    };

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const createVideo = async (form: UploadVideoType & { creatorId: string }): Promise<VideoType> => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);

        const videoData: NewVideoType = {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            creator: form.creatorId,
            prompt: form.prompt
        }

        const newVideo = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            videoData
        );

        return newVideo as unknown as VideoType;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}