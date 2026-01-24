import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './ModaleList.css'
import Modale from '../commons/Modale.tsx'
import ListIcon from '../../img/list.svg?react'
import { ALL_CATEGORIES, ALL_MUSICS } from '../../config/consts.ts'

const ModaleList = () => {
	const { i18n : { language }, t } = useTranslation()

	const [isOpen, setIsOpen] = React.useState(false)

	return (<>
		<button className='header-icon-container' onClick={() => setIsOpen(true)}>
            <ListIcon className='header-icon' />
		</button>
		<Modale
			title={t('header.list.title')}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			{ALL_CATEGORIES.map((category) => (
				<>
					<h3 className='header-list-category'>{category.name[language]}</h3>
					<ul className='header-list-container'>
						{ALL_MUSICS
							.filter((music) => music.categoryId === category.id)
							.map(m => (
								<li className='header-list-item'>
									<a target="_blank" href={m.url}>{m.name[language]}</a>
								</li>
							))
						}
					</ul>
				</>
			))}
		</Modale>
	</>)
}

export default ModaleList
