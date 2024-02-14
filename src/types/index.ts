export type UserFormDataType = {
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    password:string,
}

export type UserType = {
    id:number,
    firstName:string,
    lastName:string,
    username:string,
    email:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light'

export type TokenType = {
    token: string,
    tokenExpiration: string
}



export type PostFormDataType = {
    title:string,
    body:string
}
