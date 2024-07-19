import { UserType } from "./UserTypes"

export type GlobalContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType,
    setUser: React.Dispatch<any>,
    isLoading: boolean
}