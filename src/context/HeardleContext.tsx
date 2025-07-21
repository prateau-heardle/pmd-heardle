import React from 'react'
import musics from '../config/musics.json'
import type { GameState, MusicElement } from '../config/types.ts'
import { getTodaySong } from './seededRng.ts'
import { getGameStateDay, getToday, saveGameState, sortMusicById } from '../config/utils.ts'

export interface HeardleContextProps {
	currentMusic: MusicElement,
	allMusics: MusicElement[],
	gameState: GameState,
	guessMusic: (musicId?: number) => void,
	musicImage?: string,
	setMusicImage: (image: string) => void
}

const Context = React.createContext<HeardleContextProps>({} as HeardleContextProps)

export const useHeardleContext = () => React.useContext(Context)

const HeardleContext = ({ children }: React.PropsWithChildren) => {
	const [gameState, setGameState] = React.useState<GameState>()
	const [musicImage, setMusicImage] = React.useState<string>()

	const today = getToday()
	const allMusics = (musics as MusicElement[]).sort(sortMusicById)
	const currentMusic = getTodaySong(allMusics, today)

	React.useEffect(() => {
		setGameState(getGameStateDay(today) || { date: today, response: currentMusic.id, attempts: [] })
	}, [])

	React.useEffect(() => {
		if (gameState != undefined) {
			saveGameState(gameState)
		}
	}, [gameState])

	const guessMusic = (musicId?: number) => {
		setGameState(old => ({
			...old!,
			attempts: [...old!.attempts, musicId]
		}))
	}

	if (!gameState) {
		return null
	}

	return (
		<Context.Provider
			value={{
				currentMusic,
				allMusics,
				gameState,
				guessMusic,
				musicImage,
				setMusicImage
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default HeardleContext
