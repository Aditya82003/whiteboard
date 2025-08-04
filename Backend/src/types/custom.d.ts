export type TokenPayload = {
    id: string
}

export type IUser = {
    id:string,
    fullname:string,
    email:string,
    profilePic:string | null,
    createdAt: Date
}