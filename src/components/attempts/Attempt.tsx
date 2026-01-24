/// <reference types="vite-plugin-svgr/client" />

import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import './Attempt.css'
import CheckboxIcon from '../../img/checkbox.svg?react'
import CrossIcon from '../../img/cross.svg?react'
import { ALL_MUSICS } from '../../config/consts'

type Props = {
	musicId?: number
}

const Attempt = ({ musicId } : Props) => {
	const { i18n : { language }, t } = useTranslation()

	const selectedMusic = ALL_MUSICS.find(music => music.id === musicId)

	if (selectedMusic) {
		return <div className={classNames('attempt', 'attempt--guessed')}>
			<CrossIcon className='icon' />
			{selectedMusic.name[language]} - {selectedMusic.category[language]}
		</div>
	}

	return (
		<div className={classNames('attempt', 'attempt--skipped')}>
			<CheckboxIcon />
			{t('game.attempts.skipped')}
		</div>
	)
}

export default Attempt
