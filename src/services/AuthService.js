import store from '../store'
import { http } from './HttpService'
import jwt from 'jsonwebtoken'
import { findFriends } from './FeedService.js'

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token != null
}

export function login(user) {
    findFriends()
    .then((res) => {
        store.state.friends = res.data
    })

    return http().post('/api/auth', user)
    .then(res => {
        if(res) {
            setToken(res.data.token)
        }
    })
}

function setToken(token) {
    localStorage.setItem('token', token)
    store.dispatch('authenticate')
}

export function getToken() {
    return localStorage.getItem('token')
}

export function logout() {
    localStorage.clear()
    store.state.friends = []
    store.dispatch('authenticate')
}

export function getUsername() {
    const token = decodeToken()

    if(!token) {
        return null
    }

    return token.user.username
}

export function getUserId() {
    const token = decodeToken()

    if(!token) {
        return null
    }

    return token.user.id
}

export function registerUser(user) {
    return http().post('/api/register', user)
}

function decodeToken() {
    const token = getToken()

    if(!token) {
        return null
    }

    return jwt.decode(token)
}