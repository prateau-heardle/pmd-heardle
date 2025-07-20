import React from 'react'
import Fuse from 'fuse.js'
import { useTranslation } from 'react-i18next'
import { useHeardleContext } from '../../context/HeardleContext'
import type { MusicElement } from '../../config/types'
import Option from './Option'
import './Search.css'

const FUSE_BASE_OPTIONS = {
	ignoreDiacritics: true,
	ignoreLocation: true
}

const Search = () => {
	const { i18n : { language }, t } = useTranslation()
	const { allMusics, guessMusic } = useHeardleContext()

	const [search, setSearch] = React.useState<string>()
	const [showOptions, setShowOptions] = React.useState<boolean>(false)
	const [selectedMusic, setSelectedMusic] = React.useState<MusicElement | undefined>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setSelectedMusic(undefined)
	}
	
	const fuse = new Fuse(allMusics, {
		...FUSE_BASE_OPTIONS,
		keys: [
			`name.${language}`,
			`category.${language}`
		]
	})

	const getSearchResults = (): MusicElement[] => (
		fuse.search(search || '')
			.slice(0, 10)
			.map(e => e.item)
	)

	return (
		<div className='search'>
			{showOptions && search && (
				<ul className='option-list'>
					{getSearchResults().map((music) => (
						<Option
							music={music}
							onSelect={() => {
								setSelectedMusic(music)
								setSearch(music.name[language])
							}}
						/>
					))}
				</ul>
			)}
			<input
				className='search-bar'
				onChange={handleChange}
				onFocus={() => setShowOptions(true)}
				onBlur={() => setShowOptions(false)}
				value={search}
				placeholder={t('game.search.placeholder')}
			/>
			<button onClick={() => guessMusic(undefined)}>{t('game.search.skip')}</button>
			<button onClick={() => guessMusic(selectedMusic?.id)} disabled={!selectedMusic}>{t('game.search.submit')}</button>
		</div>
	)
}

export default Search
