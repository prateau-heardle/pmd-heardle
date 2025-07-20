import React from 'react'
import Fuse from 'fuse.js'
import { useTranslation } from 'react-i18next'
import { useHeardleContext } from '../../context/HeardleContext'
import type { MusicElement } from '../../config/types'
import Option from './Option'
import './Search.css'
import Button, { Variant } from '../commons/Button'

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
	const inputRef = React.useRef<HTMLInputElement>(null)

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

	const onSubmit = () => {
		if (selectedMusic) {
			guessMusic(selectedMusic.id)
		} else {
			inputRef.current?.focus()
		}
	}

	return (
		<>
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
					ref={inputRef}
					onChange={handleChange}
					onFocus={() => setShowOptions(true)}
					onBlur={() => setShowOptions(false)}
					value={search}
					placeholder={t('game.search.placeholder')}
				/>
			</div>
			<div className='search-buttons'>
				<Button
					label={t('game.search.skip')}
					onClick={() => guessMusic(undefined)}
					variant={Variant.Secondary}
				/>
				<Button
					label={t('game.search.submit')}
					onClick={onSubmit}
					variant={Variant.Primary}
				/>
			</div>
		</>
	)
}

export default Search
