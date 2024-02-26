export interface User {
    id?: number
    
    name: string
    login: string
    phone: string
    email: string
    active: string
    password: string
    access_rights: number[]

    role: 'admin' | 'manager'

    created_at?: string
    updated_at?: string
}

export interface Brigade {
    id?: number

    name: string
    number: string
    phone: string
    email: string
    active: string

    created_at?: string
    updated_at?: string
}

export interface Equipment {
    id?: number

    title: string
    count: number | string
    price: number | string

    prop?: Props | number | null
}

export interface Props {
    id?: number

    date: string
    type: string
    name: string
    phone: string
    status: string
    address: string
    comment: string
    status_date?: string
    manager: User | number | null |""
    brigade?: Brigade | number | null |""
    equipments: Equipment[]

    created_at?: string
    updated_at?: string
}

export interface Email {
    id?: number
    firstName?: string
    middleName?: string
    lastName?: string
    phone?: string
    email: string
    altEmail?: string
    password?: string

    created_at?: string
    updated_at?: string
}

export interface CatalogProduct {
    id?: number
    title: string
    article: string
    price: number
    currency_price: number
    base_price: number
    quantity: string
}

export interface Chat {
    id?: number
    name?: string
    users: User[]
    type: 'private' | 'group'

    created_at?: string
    updated_at?: string 
}

export interface Message {
    id?: number
    text: string
    file?: MessageFile
    chat: Chat
    sender: User

    created_at?: string
    updated_at?: string
}

export interface MessageFile {
    id?: number
    filename: string
    type: string
    message: Message

    created_at?: string
    updated_at?: string
}

// popups
export interface Overpriced {
    id?: number

    link: string
    name: string
    phone: string
    check: boolean
    status: 'overpriced' | 'checkcost'
    product: number | null
    
    created_at?: string
    updated_at?: string
}

export interface Delivery {
    id?: number

    phone: string
    product: number | null
    check: boolean
    
    created_at?: string
    updated_at?: string
}

export interface Advice {
    id?: number

    phone: string
    product: number | null
    check: boolean
    
    created_at?: string
    updated_at?: string
}

export interface FeedBack {
    id?: number

    name: string
    phone: string
    check: boolean
    
    created_at?: string
    updated_at?: string
}

// MoreQuestions
export interface HelpInstall {
    id?: number

    name: string
    phone: string
    check: boolean
    message: string
    product: number | null
    
    created_at?: string
    updated_at?: string
}

export interface ManagerContact {
    id?: number

    phone: string
    check: boolean
    
    created_at?: string
    updated_at?: string
}