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

export function deletePost({ postId }) {
    return http().delete(`/api/post/deletePost/${postId}`)
}

export function editPost({ post }) {
    return http().get(`/api/post/editPost`, {
       params: {
           post
        }
    })
}