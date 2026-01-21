import * as React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import './ModaleInfo.css'
import Modale from '../commons/Modale.tsx'
import InfoIcon from '../../img/info.svg?react'

const ModaleInfos = () => {
	const { t } = useTranslation()

	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<div className='header-icon-container'>
			<InfoIcon className='header-icon' onClick={() => setIsOpen(true)} />
		</div>
		<Modale
			title={t('header.infos.title')}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className='header-infos-text'>
				<Trans
					i18nKey="header.infos.text"
					components={{ a: <a /> }}
				/>
			</div>
			<p className='header-infos-subText'>
				<Trans
					i18nKey="header.infos.subText"
					components={{ a: <a /> }}
				/>
			</p>
		</Modale>
	</>)
}

export default ModaleInfos
