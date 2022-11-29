import { createSlice } from '@reduxjs/toolkit'
import { AxiosRequestConfig } from 'axios'

export interface infoState {
    login: boolean
    accessToken: AxiosRequestConfig<any>
    refreshToken: AxiosRequestConfig<any>
    SearchValue: string
    userId: string
}

const initialState = {
    login: false,
    accessToken: '',
    refreshToken: '',
    SearchValue: '',
    userId: '',
} as infoState

export const info = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
            localStorage.setItem('accessToken', action.payload);
        },
        setSearchValue: (state, action) => {
            state.SearchValue = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
            localStorage.setItem('refreshToken', action.payload);
        }
    },
})

export const { setLogin, setAccessToken, setSearchValue, setRefreshToken, setUserId } = info.actions

export default info.reducer