import { http } from './HttpService.js'

export function getFriendsList() {
    return http().get(`/api/friend/friendsList`)
}

export function addFriend(username) {
    return http().post(`/api/friend/addFriend/${username}`)
}

export function getFriends() {
    return http().get(`/api/friend/getFriends`)
}

export function addPendingFriend({ friendId }) {
    return http().get(`/api/friend/addPendingFriend/${friendId}`)
}

export function getPendingFriends() {
    return http().get(`/api/friend/getPendingFriends`)
}

export function getSentPendingFriends() {
    return http().get(`/api/friend/getSentPendingFriends`)
}

export function deleteFriend({ friendId }) {
    return http().delete(`/api/friend/deleteFriend/${friendId}`)
}