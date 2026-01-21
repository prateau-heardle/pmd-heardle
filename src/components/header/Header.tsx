import { useTranslation } from 'react-i18next'
import './Header.css'
import { Locales } from '../../config/i18n/i18n.ts'
import HeartIcon from '../../img/heart.svg?react'
import ListIcon from '../../img/list.svg?react'
import QuestionIcon from '../../img/question.svg?react'
import StatsIcon from '../../img/stats.svg?react'
import FlagFrIcon from '../../img/flagFr.svg?react'
import ModaleInfos from './ModaleInfo.tsx'

const Header = () => {
	const { i18n, t } = useTranslation()

	// TODO c'est vraiment utile ça ?
	const changeLanguage = (lang: Locales) => {
		i18n.changeLanguage(lang)
	}

	return (
		<header className='header'>
			<div className='header-content'>
				<ModaleInfos />
				<div className='header-icon-container'>
					<HeartIcon className='header-icon' />
				</div>
				<div className='header-icon-container'>
					<QuestionIcon className='header-icon' />
				</div>
				<h1 className='header-title'>{t('title')}</h1>
				<div className='header-icon-container'>
					<StatsIcon className='header-icon' />
				</div>
				<div className='header-icon-container'>
					<ListIcon className='header-icon' />
				</div>
				<div className='header-icon-container'>
					<FlagFrIcon className='header-icon' />
				</div>
			</div>
		</header>
	)
}

export default Header
