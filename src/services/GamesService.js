import { http } from './HttpService'

export function getGames() {
    return http().get(`/api/games/getGames`)
}