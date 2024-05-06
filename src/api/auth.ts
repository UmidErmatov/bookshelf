/* eslint-disable no-useless-concat */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthCredentials, BookList, UserInfo } from '../types/common'
import { MD5 } from 'crypto-js'

export interface UserResponse {
    user: AuthCredentials
    token: string
}

export interface SignupResponse {
    data: UserInfo,
    isOk: boolean,
    message: string
}
export interface BookListResponse {
    data: Array<BookList> | null,
    isOk: boolean,
    message: string
}

export interface LoginRequest {
    username: string
    password: string
}
export interface AddBookResponse {
    data: BookList | any,
    isOk: boolean,
    message: string
}
export interface AddBookRequest {
    isbn?: string,
    title?: string,
    cover?: string,
    author?: string,
    published?: number,
    pages?: number
}
export interface UpdateBookRequest {
    id: number
    isbn?: string,
    title?: string,
    cover?: string,
    author?: string,
    published?: number,
    pages?: number
}
export interface DeleteBookRequest {
    id: number
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BACKEND_URL || 'https://no23.lavina.tech/'
    }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, AuthCredentials>({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'books',
                method: 'POST',
                body: credentials,
            }),
        }),
        createBook: builder.mutation<AddBookResponse, AddBookRequest>({
            query: (credentials) => {
                const key = localStorage.getItem("key");
                const secret = localStorage.getItem("secret");
                const signstr = "POST" + "/books" + JSON.stringify(credentials) + JSON.parse(secret ?? "")
                const sign = MD5(signstr).toString()

                return {
                    url: 'books',
                    method: 'POST',
                    body: credentials,
                    headers: {
                        key: JSON.parse(key ?? ""),
                        sign
                    },
                }
            },
            invalidatesTags: ['books']
        }),
        updateBook: builder.mutation<AddBookResponse, UpdateBookRequest>({
            query: (credentials) => {
                const { id, ...rest } = credentials
                const key = localStorage.getItem("key");
                const secret = localStorage.getItem("secret");
                const signstr = "PATCH" + `/books/${id}` + JSON.stringify(rest) + JSON.parse(secret ?? "")
                const sign = MD5(signstr).toString()

                return {
                    url: `/books/${id}`,
                    method: 'PATCH',
                    body: rest,
                    headers: {
                        key: JSON.parse(key ?? ""),
                        sign
                    },
                }
            },
            invalidatesTags: ['books']
        }),
        deleteBook: builder.mutation<any, DeleteBookRequest>({
            query: (credentials) => {
                const key = localStorage.getItem("key");
                const secret = localStorage.getItem("secret");
                const signstr = "DELETE" + `/books/${credentials.id}` + JSON.parse(secret ?? "")
                const sign = MD5(signstr).toString()

                return {
                    url: `/books/${credentials.id}`,
                    method: 'DELETE',
                    headers: {
                        key: JSON.parse(key ?? ""),
                        sign
                    },
                }
            },
            invalidatesTags: ['books']
        }),
        getAllBooks: builder.query<BookListResponse, undefined>({
            query: () => {
                const key = localStorage.getItem("key");
                const secret = localStorage.getItem("secret");
                const signstr = "GET" + "/books" + JSON.parse(secret ?? "")
                const sign = MD5(signstr).toString()
                return {
                    url: 'books',
                    method: 'GET',
                    headers: {
                        key: JSON.parse(key ?? ""),
                        sign
                    },
                }
            },
            providesTags: ['books']
        }),
    }),
})

export const { useLoginMutation, useSignupMutation, useGetAllBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation } = api
