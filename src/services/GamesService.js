import { http } from './HttpService'

export function getGames() {
    return http().get(`/api/games/getGames`)
}

export function leaveGame(gameId) {
    return http().get(`/api/games/leaveGame/${ gameId }`)
}