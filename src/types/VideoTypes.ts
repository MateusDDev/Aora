import { UserType } from "./UserTypes"

export type VideoType = {
    $id: string,
    title: string,
    thumbnail: string,
    prompt: string,
    video: string,
    creator: UserType
}