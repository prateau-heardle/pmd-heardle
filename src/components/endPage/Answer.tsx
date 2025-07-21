import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useHeardleContext } from '../../context/HeardleContext'
import ArrowRightIcon from '../../img/arrowRight.svg?react'
import SoundcloudIcon from '../../img/soundcloud.svg?react'
import './Answer.css'

const Answer = () => {
	const { i18n : { language } } = useTranslation()
	const { currentMusic, gameState, musicImage } = useHeardleContext()

	const isWon = gameState.attempts.includes(currentMusic.id)

	return (
		<div className='soundcloud-box-container'>
			<a className={classNames('soundcloud-box', { 'soundcloud-box--win': isWon})} href={currentMusic.url}>
				<img className='soundcloud-cover' src={musicImage} />
				<div className='soundcloud-title'>
					<p className='soundcloud-music-category'>{currentMusic.category[language]}</p>
					<p className='soundcloud-music-name'>{currentMusic.name[language]}</p>
				</div>
				<div className='soundcloud-icon'>
					<SoundcloudIcon />
					<ArrowRightIcon />
				</div>
			</a>
		</div>
	)
}

export default Answer
