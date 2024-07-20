import { config, databases } from "./appwrite";
import { VideoType } from "../types/VideoTypes";
import { Query } from "react-native-appwrite";

const { databaseId, videoCollectionId } = config

export const getAllVideos = async (): Promise<VideoType[]> => {
    try {
        const videos = await databases.listDocuments(
            databaseId,
            videoCollectionId
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