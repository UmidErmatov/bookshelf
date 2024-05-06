/* eslint-disable @typescript-eslint/no-unused-expressions */
export interface AuthCredentials {
    name: string;
    email: string;
    key: string;
    secret: string;
}

export interface Book {
    id: number,
    isbn: string,
    title: string,
    cover: string,
    author: string,
    published: number,
    pages: number
}

export interface BookList {
    book: Book,
    status: number
}

export interface UserInfo extends AuthCredentials {
    id: number;
}