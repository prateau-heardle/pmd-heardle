import React from 'react'
import type { GameState, MusicElement } from '../config/types.ts'
import { getTodaySong } from './seededRng.ts'
import { getGameStateDay, getInfiniteId, getTodayId, saveGameState } from '../config/utils.ts'
import { ALL_MUSICS } from '../config/consts.ts'

export interface HeardleContextProps {
	currentMusic: MusicElement,
	gameState: GameState,
	guessMusic: (musicId?: number) => void,
	isInfinite: boolean,
	setIsInfinite: (isInfinite: boolean) => void,
	nextMusic: () => void,
	musicImage?: string,
	setMusicImage: (image: string) => void
}

const Context = React.createContext<HeardleContextProps>({} as HeardleContextProps)

export const useHeardleContext = () => React.useContext(Context)

const HeardleContext = ({ children }: React.PropsWithChildren) => {
	const [isInfinite, setIsInfinite] = React.useState<boolean>(false)
	const [gameState, setGameState] = React.useState<GameState>()
	const [musicImage, setMusicImage] = React.useState<string>()

	const initGameState = React.useCallback(() => {
		const todayId = isInfinite ? getInfiniteId() : getTodayId()
		const currentMusic = getTodaySong(ALL_MUSICS, todayId)
		setGameState(getGameStateDay(isInfinite, todayId) || { dateId: todayId, response: currentMusic.id, attempts: [] })

		return todayId
	}, [isInfinite])

	React.useEffect(() => {
		const todayId = initGameState()
		
		const reload = setInterval(() => {
			if (!isInfinite && getTodayId() !== todayId) {
				window.location.reload()
			}
		}, 1000)
		return () => clearInterval(reload)
	}, [isInfinite])

	const guessMusic = (musicId?: number) => {
		setGameState(old => {
			const newState = {
				...old!,
				attempts: [...old!.attempts, musicId]
			}
			saveGameState(isInfinite, newState)
			return newState
		})
	}

	const currentMusic = ALL_MUSICS.find(m => m.id === gameState?.response)

	if (!gameState || !currentMusic) {
		return null
	}

	return (
		<Context.Provider
			value={{
				currentMusic,
				gameState,
				guessMusic,
				isInfinite,
				setIsInfinite,
				nextMusic: initGameState,
				musicImage,
				setMusicImage
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default HeardleContext
