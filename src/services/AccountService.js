import { http } from './HttpService'

export function findAccount({ accountId }) {
    return http().get(`/api/account/getAccount/${accountId}`)
}

export function editAccount({ user }) {
    return http().get(`/api/account/editAccount`, {
        params: user
    })
}