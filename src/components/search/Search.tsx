import React from 'react'
import Fuse from 'fuse.js'
import { useTranslation } from 'react-i18next'
import { useHeardleContext } from '../../context/HeardleContext'
import type { MusicElement } from '../../config/types'
import Option from './Option'
import './Search.css'
import Button, { Variant } from '../commons/Button'
import SearchIcon from '../../img/search.svg?react'
import CrossIcon from '../../img/cross.svg?react'
import { useDebounce } from '../../config/useDebounce'
import { ALL_MUSICS, HEARDLE_SPLITS } from '../../config/consts'

const FUSE_BASE_OPTIONS = {
	ignoreDiacritics: true,
	ignoreLocation: true
}

const Search = () => {
	const { i18n : { language }, t } = useTranslation()
	const { guessMusic, gameState } = useHeardleContext()

	const [search, setSearch] = React.useState<string>()
	const [searchResults, setSearchResults] = React.useState<MusicElement[]>([])
	const [showOptions, setShowOptions] = React.useState<boolean>(false)
	const [selectedMusic, setSelectedMusic] = React.useState<MusicElement | undefined>()
	const inputRef = React.useRef<HTMLInputElement>(null)

	const debouncedSearch = useDebounce(search)

	const resetInput = () => {
		setSearch(undefined)
		setSelectedMusic(undefined)
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		setSelectedMusic(undefined)
	}
	
	const fuse = React.useMemo(() => (
		new Fuse(ALL_MUSICS, {
			...FUSE_BASE_OPTIONS,
			keys: [
				`name.${language}`,
				`category.${language}`
			]
		})
	), [language])

	React.useEffect(() => {
		setSearchResults(
			fuse.search(debouncedSearch || '')
				.slice(0, 10)
				.map(e => e.item)
				.reverse()
		)
	}, [debouncedSearch, fuse])

	const onSubmit = () => {
		if (selectedMusic) {
			guessMusic(selectedMusic.id)
		} else {
			inputRef.current?.focus()
		}
	}

	const secondsNext = HEARDLE_SPLITS.length > gameState.attempts.length
		? HEARDLE_SPLITS[gameState.attempts.length + 1] - HEARDLE_SPLITS[gameState.attempts.length]
		: undefined

	return (
		<>
			<div className='search'>
				{showOptions && debouncedSearch && (
					<ul className='option-list' role='listbox'>
						{searchResults.length ? (
							searchResults.map((music) => (
								<Option
									music={music}
									onSelect={() => {
										setSelectedMusic(music)
										setSearch(music.name[language])
										inputRef.current?.blur()
									}}
								/>
							))
						) : <div className='no-result-option'>{t('game.search.noResult')}</div>}
					</ul>
				)}
				<SearchIcon className='search-icon' />
				<input
					className='search-bar'
					ref={inputRef}
					onChange={handleChange}
					onFocus={() => setShowOptions(true)}
					onBlur={() => setShowOptions(false)}
					value={search}
					placeholder={t('game.search.placeholder')}
				/>
				<CrossIcon
					role='button'
					className='search-reset-icon'
					onClick={resetInput}
				/>
			</div>
			<div className='search-buttons'>
				<Button
					label={secondsNext ? t('game.search.skipWithSeconds', { secondNb: secondsNext }) : t('game.search.skip')}
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
