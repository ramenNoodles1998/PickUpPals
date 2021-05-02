import { http } from './HttpService.js'

export function getPosts() {
    return http().get(`/api/post/posts`)
}

export function getSubscriptionPosts() {
    return http().get(`/api/post/subscriptionPosts`)
}

export function getUserPosts() {
    return http().get(`/api/post/userPosts`)
}

export function getAllPosts() {
    return http().get(`/api/post/getAllPosts`)
}