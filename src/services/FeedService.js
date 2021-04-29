import { http } from './HttpService'

export function getFriendsList() {
    return http().get(`/api/feed/friendsList`)
}

export function addFriend(username) {
    return http().post(`/api/feed/addFriend/${username}`)
}

export function findFriends() {
    return http().get(`/api/feed/findFriends`)
}

export function getPosts() {
    return http().get(`/api/feed/posts`)
}

export function getSubscriptionPosts() {
    return http().get(`/api/feed/subscriptionPosts`)
}

export function getUserPosts() {
    return http().get(`/api/feed/userPosts`)
}

export function getSubscriptionSports() {
    return http().get(`/api/feed/getSubscriptionSports`)
}