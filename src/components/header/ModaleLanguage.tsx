import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleLanguage.css'
import { Locales } from '../../config/i18n/i18n.ts'
import Modale from '../commons/Modale.tsx'
import FlagFrIcon from '../../img/flagFr.svg?react'
import FlagGbIcon from '../../img/flagGb.svg?react'

const getLocaleFlag = (locale: Locales): React.FunctionComponent<React.SVGProps<SVGSVGElement>> => {
	switch (locale) {
		case Locales.EN:
			return FlagGbIcon
		case Locales.FR:
			return FlagFrIcon
		default:
			return locale satisfies never // assert unreachable
	}
}

const ModaleLanguage = () => {
	const { i18n : { changeLanguage, language }, t } = useTranslation()

	const [isOpen, setIsOpen] = React.useState(false)

	const Flag = getLocaleFlag(language as Locales)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
			<Flag className='header-icon' />
		</button>
		<Modale
			title={t('header.language.title')}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
            <div className='header-language-container'>
				{Object.values(Locales).map((locale) => {
					const LocaleFlag = getLocaleFlag(locale)
					return (
						<div className='header-language-icon-container' onClick={() => changeLanguage(locale)}>
							<LocaleFlag className='header-language-icon' />
						</div>
					)
				})}
            </div>
		</Modale>
	</>)
}

export default ModaleLanguage
