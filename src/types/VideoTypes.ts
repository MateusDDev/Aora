import { DocumentPickerAsset } from "expo-document-picker"
import { UserType } from "./UserTypes"

export type VideoType = {
    $id: string,
    title: string,
    thumbnail: string,
    prompt: string,
    video: string,
    creator: UserType
}

export type NewVideoType = {
    title: string,
    thumbnail: string,
    prompt: string,
    video: string,
    creator: string
}

export type UploadVideoType = {
    title: string,
    video: DocumentPickerAsset,
    thumbnail: DocumentPickerAsset,
    prompt: string
}