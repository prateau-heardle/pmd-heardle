import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleStats.css'
import Modale from '../commons/Modale.tsx'
import StatsIcon from '../../img/stats.svg?react'
import type { GameState } from '../../config/types.ts'
import { getGameState } from '../../config/utils.ts'
import { useHeardleContext } from '../../context/HeardleContext.tsx'
import { HEARDLE_SPLITS } from '../../config/consts.ts'
import { Bar } from 'react-chartjs-2'

type Streak = {
	lastId: number,
	length: number
}

const getStreaks = (history: GameState[]): Streak[] => (
	history
		.filter(state => state.attempts.includes(state.response))
		.sort((a, b) => a.dateId - b.dateId)
		.reduce((allStreaks, state) => {
			const currentStreak = allStreaks.find(streak => streak.lastId + 1 === state.dateId)
			if (currentStreak) {
				return [
					...allStreaks.filter(streak => streak !== currentStreak),
					{ lastId: state.dateId, length: currentStreak.length + 1 }
				]
			} else {
				return [
					...allStreaks,
					{ lastId: state.dateId, length: 1 }
				]
			}
		}, [] as Streak[])
)

const getDataFromHistory = (history: GameState[]): number[] => (
	history.reduce((result, state) => {
		if (state.attempts.includes(state.response)) {
			result[state.attempts.length - 1] += 1
		} else {
			result[HEARDLE_SPLITS.length] += 1
		}
		return result
	}, Array(HEARDLE_SPLITS.length).fill(0))
)

const ModaleStats = () => {
	const { t } = useTranslation()
	const { gameState } = useHeardleContext()

	const [isOpen, setIsOpen] = React.useState(false)
	const [gameHistory, setGameHistory] = React.useState<GameState[]>([])

	React.useEffect(() => {
		setGameHistory(getGameState())
	}, [isOpen])

	const isTodayWon = gameState.attempts.some(musicId => musicId === gameState.response)
	const isTodayFinished = isTodayWon || gameState.attempts.length >= HEARDLE_SPLITS.length

	const currentHistory = isTodayFinished ? gameHistory : gameHistory.filter(state => state.dateId !== gameState.dateId)

	const gamePlayed = currentHistory.length
	const gameWon = currentHistory.filter(state => state.attempts.includes(state.response)).length
	const winRate = currentHistory.length > 0 ? Math.round((gameWon / gamePlayed) * 100) : 0

	const allStreaks = getStreaks(currentHistory)
	const currentStreak = allStreaks.find(streak => streak.lastId === (isTodayFinished ? gameState.dateId : gameState.dateId - 1))?.length || 0
	const maxStreak = Math.max(0, ...allStreaks.map(streak => streak.length))

	const data = {
		labels: [...Array.from({ length: HEARDLE_SPLITS.length - 1 }, (_, i) => i + 1), 'X'],
		datasets: [{
			data: getDataFromHistory(currentHistory),
			backgroundColor: [...Array(HEARDLE_SPLITS.length - 1).fill('#1d7e05'), '#ff0000']
		}]
	}

	return (<>
		<div className='header-icon-container' onClick={() => setIsOpen(true)}>
			<StatsIcon className='header-icon' />
		</div>
		<Modale
			title={t('header.stats.title')}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className='header-stats-container'>
				<Bar
					data={data}
					options={{
						plugins: {
							legend: {
								display: false
							}
						},
						scales: {
							y: {
								ticks: {
									precision: 0
								}
							}
						}
					}}
				/>
				<div className='header-stats-item-container'>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{gamePlayed}</div>
						{t('header.stats.played')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{gameWon}</div>
						{t('header.stats.won')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{winRate}%</div>
						{t('header.stats.winRate')}
					</div>
				</div>
				<div className='header-stats-item-container'>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{currentStreak}</div>
						{t('header.stats.currentStreak')}
					</div>
					<div className='header-stats-item'>
						<div className='header-stats-item-value'>{maxStreak}</div>
						{t('header.stats.maxStreak')}
					</div>
				</div>
			</div>
		</Modale>
	</>)
}

export default ModaleStats
