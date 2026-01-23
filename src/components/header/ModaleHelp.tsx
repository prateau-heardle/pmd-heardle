import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleHelp.css'
import Modale from '../commons/Modale.tsx'
import QuestionIcon from '../../img/question.svg?react'
import MusicIcon from '../../img/music.svg?react'
import SoundIcon from '../../img/sound.svg?react'
import ThumbIcon from '../../img/thumb.svg?react'
import ListIcon from '../../img/list.svg?react'
import Button, { Variant } from '../commons/Button.tsx'
import { getShowHelp, setShowHelp } from '../../config/utils.ts'

const ModaleHelp = () => {
	const { t } = useTranslation()

	const [isOpen, setIsOpen] = React.useState(false)

	React.useEffect(() => {
		const showHelp = getShowHelp()
		setIsOpen(showHelp)
	}, [])

	const closeModale = () => {
		setIsOpen(false)
		setShowHelp(false)
	}

	return (<>
		<div className='header-icon-container'>
            <QuestionIcon className='header-icon' onClick={() => setIsOpen(true)} />
		</div>
		<Modale
			title={t('header.help.title')}
			isOpen={isOpen}
			onClose={closeModale}
		>
            <div className='header-help-container'>
		        <div className='header-help-item'>
                    <MusicIcon className='header-help-item-icon' />
					<p>{t('header.help.listen')}</p>
                </div>
		        <div className='header-help-item'>
                    <SoundIcon className='header-help-item-icon' />
					<p>{t('header.help.progress')}</p>
                </div>
		        <div className='header-help-item'>
                    <ThumbIcon className='header-help-item-icon' />
					<p>{t('header.help.win')}</p>
                </div>
		        <div className='header-help-item'>
                    <ListIcon className='header-help-item-icon' />
					<p>{t('header.help.list')}</p>
                </div>
				<Button label={t('header.help.play')} variant={Variant.Primary} onClick={closeModale} />
            </div>
		</Modale>
	</>)
}

export default ModaleHelp
