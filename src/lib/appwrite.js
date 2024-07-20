import { Client, Account, Avatars, Databases, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.filks.aora',
    projectId: '66994bb0000bef148145',
    databaseId: '66994d3a00318c5a540a',
    userCollectionId: '66994d6a001b35b48bf3',
    videoCollectionId: '66994d8a002015ddf2f7',
    storageId: '66994f2d00003e1c4948'
}

// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
