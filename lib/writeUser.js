import { ID } from "react-native-appwrite";
import { account, avatars, config, databases } from "./appwrite";

export const createUser = async (email, password, username) => {
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
        throw new Error('Error during account creation');
    }

    try {
        await signIn(email, password);

        const avatarUrl = avatars.getInitials(username);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );
        return newUser;
    } catch (error) {
        console.log(error.message)
        throw new Error('Error during user creation')
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// export const logOut = async () => {
//     await account.deleteSession('current');
// }