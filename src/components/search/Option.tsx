import { useTranslation } from 'react-i18next'
import type { MusicElement } from '../../config/types'
import './Option.css'

type Props = {
    music: MusicElement,
    onSelect: () => void
}

const Option = ({ music, onSelect }: Props) => {
	const { i18n : { language } } = useTranslation()

	return (
		<li
			key={music.id}
            className='option'
			onClick={onSelect}
			role='option'
		>
			{music.name[language]} - {music.category[language]}
		</li>
	)
}

export default Option
