import { useTranslation } from 'react-i18next'
import './Header.css'
import StatsIcon from '../../img/stats.svg?react'
import ModaleInfos from './ModaleInfo.tsx'
import ModaleSupport from './ModaleSupport.tsx'
import ModaleHelp from './ModaleHelp.tsx'
import ModaleLanguage from './ModaleLanguage.tsx'
import ModaleList from './ModaleList.tsx'

const Header = () => {
	const { t } = useTranslation()

	return (
		<header className='header'>
			<div className='header-content'>
				<ModaleInfos />
				<ModaleSupport />
				<ModaleHelp />
				<h1 className='header-title'>{t('title')}</h1>
				<div className='header-icon-container'>
					<StatsIcon className='header-icon' />
				</div>
				<ModaleList />
				<ModaleLanguage />
			</div>
		</header>
	)
}

export default Header
