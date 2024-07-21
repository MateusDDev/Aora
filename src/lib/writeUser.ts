import { ID, Query } from "react-native-appwrite";
import { account, avatars, config, databases } from "./appwrite";
import { UserType } from "../types/UserTypes";
import { VideoType } from "../types/VideoTypes";

const { databaseId, userCollectionId, videoCollectionId } = config;

export const createUser = async (email, password, username): Promise<UserType> => {
    let newAccount;

    try {
        newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw new Error('Error during account creation');
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    try {
        await signIn(email, password);

        const avatarUrl = avatars.getInitials(username);

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        return newUser as unknown as UserType;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const signIn = async (email, password): Promise<UserType> => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session as unknown as UserType;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async (): Promise<UserType> => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('Account not found')

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw new Error('User not found')

        return currentUser.documents[0] as unknown as UserType;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getUserVideos = async (userId: string): Promise<VideoType[]> => {
    try {
        const videos = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        );

        return videos.documents as unknown as VideoType[]
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signOut = async (): Promise<void> => {
    try {
        await account.deleteSession('current');

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}