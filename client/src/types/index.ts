export interface IUser {
    _id?: string

    age: number
    name: string
    email: string
    gender: string
    password: string

    createdAt?: string
    updatedAt?: string
}

export interface ITournament {
    _id?: string

    date: string
    title: string
    description: string
    winner?: IUser | null
    users?: IUser[]
    matchs?: IMatch[]

    createdAt?: string
    updatedAt?: string
}

export interface IMatch {
    _id?: string

    date: string
    title: string
    description: string
    winner?: IUser | null
    users?: IUser[]
    time: number

    level?: 32|16|8|4|2

    createdAt?: string
    updatedAt?: string
}