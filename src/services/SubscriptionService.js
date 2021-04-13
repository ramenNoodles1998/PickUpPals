import { http } from './HttpService'

export function getSubscriptions() {
    return http().get('/api/subscriptions')
}

export function getUserSubscriptions(userId) {
    return http().get(`/api/subscriptions/${userId}`)
}

export function addUserSubscription(userId, subscriptionId) {
    return http().post(`/api/subscriptions/${userId}`, {subscriptionId})
}

export function deleteUserSubscription(userId, subscriptionId) {
    return http().delete(`/api/subscriptions/${userId}`, {subscriptionId})
}