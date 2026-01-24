import { ALL_MUSICS, HEARDLE_SPLITS, LocalStorageKeys, START_DATE } from './consts'
import type { GameState } from './types'

export const getTodayId = (): number => {
	const todayDate = new Date()
    const startDate = new Date(START_DATE)

    const diffInMilliseconds = todayDate.getTime() - startDate.getTime()
    return Math.trunc(diffInMilliseconds / (1000 * 60 * 60 * 24))
}

export const getInfiniteId = (): number => {
    const state = getGameState(true)

    if (state.length !== 0) {
        const currentGame = state.find(s => !isGameFinished(s))
        if (!currentGame) {
            return Math.max(...state.map(s => s.dateId)) + 1
        } else {
            return currentGame.dateId
        }
    } else {
        return Math.floor(Math.random() * 1000 * ALL_MUSICS.length) 
    }
}

export const getShowHelp = (): boolean => {
    return JSON.parse(window.localStorage.getItem(LocalStorageKeys.SHOW_HELP) || 'true')
}

export const setShowHelp = (showHelp: boolean) => {
    window.localStorage.setItem(LocalStorageKeys.SHOW_HELP, showHelp.toString())
}

export const getGameState = (infinite: boolean): GameState[] => {
    return JSON.parse(window.localStorage.getItem(infinite ? LocalStorageKeys.GAME_STATE_INFINITE : LocalStorageKeys.GAME_STATE) || '[]')
}

export const getGameStateDay = (infinite: boolean, dateId: number): GameState | undefined => {
    return getGameState(infinite).find(state => state.dateId === dateId)
}

export const saveGameState = (infinite: boolean, gameState: GameState) => {
    const oldState = getGameState(infinite).filter(state => state.dateId !== gameState.dateId)
    window.localStorage.setItem(infinite ? LocalStorageKeys.GAME_STATE_INFINITE : LocalStorageKeys.GAME_STATE, JSON.stringify([...oldState, gameState]))
}

export const isGameWon = (gameState: GameState): boolean => {
    return gameState.attempts.some(musicId => musicId === gameState.response)
}

export const isGameFinished = (gameState: GameState): boolean => {
    return isGameWon(gameState) || gameState.attempts.length >= HEARDLE_SPLITS.length
}

export const padStartNumber = (n: number) => n.toString().padStart(2, '0')

export const toTimeString = (ms: number) => {
    const date = new Date(ms)

    return `${padStartNumber(date.getMinutes())}:${padStartNumber(date.getSeconds())}`
}
