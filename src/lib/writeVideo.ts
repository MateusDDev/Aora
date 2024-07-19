import { config, databases } from "./appwrite";
import { VideoType } from "../types/VideoTypes";

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