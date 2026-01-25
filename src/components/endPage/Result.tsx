import * as React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import './Result.css'
import { useHeardleContext } from '../../context/HeardleContext'
import { HEARDLE_SPLITS } from '../../config/consts'
import Button, { Variant } from '../commons/Button'
import { isGameWon } from '../../config/utils'

const COPIED_MESSAGE_TIMEOUT = 2000

const Result = () => {
	const { t } = useTranslation()
	const { currentMusic, gameState, isInfinite, setIsInfinite, nextMusic } = useHeardleContext()

	const [showCopied, setShowCopied] = React.useState(false)

	const isWon = isGameWon(gameState)

	const getRecapClassname = (index: number): string => {
		if (index > gameState.attempts.length - 1) {
			return 'recap-block--empty'
		}
		const guess = gameState.attempts[index]
		if (guess === currentMusic.id) {
			return 'recap-block--win'
		}
		if (guess == null) {
			return 'recap-block--skip'
		}
		return 'recap-block--fail'
	}

	const getRecapEmoji = (index: number): string => {
		if (index > gameState.attempts.length - 1) {
			return '⬜'
		}
		const guess = gameState.attempts[index]
		if (guess === currentMusic.id) {
			return '🟩'
		}
		if (guess == null) {
			return '⬛'
		}
		return '🟥'
	}

	const share = () => {
		const summary = '🔇' + HEARDLE_SPLITS.map((_, index) => getRecapEmoji(index)).join(' ')
		const text = t('endPage.message.title', { dateId: gameState.dateId }) + '\n\n'
			+ (isWon
				? t('endPage.message.win', { count: gameState.attempts.length })
				: t('endPage.message.lose')
			) + '\n\n'
			+ summary + '\n\n'
			+ t('endPage.message.link')
		setShowCopied(true)
		navigator.clipboard.writeText(text)
		
        const timeout = setTimeout(() => {
            setShowCopied(false)
        }, COPIED_MESSAGE_TIMEOUT)

        return () => clearTimeout(timeout)
	}

	return (
		<div className='share-block'>
			<p className='score'>{isWon ? gameState.attempts.length : 0}</p>
			<div className='recap-container'>
				{HEARDLE_SPLITS.map((_, index) => (
					<div className={classNames('recap-block', getRecapClassname(index))} />
				))}
			</div>
			{isInfinite ? (<>
				<p className='recap-phrase'>{isWon ? t('endPage.infinite.win', { count: HEARDLE_SPLITS[gameState.attempts.length - 1] }) : t('endPage.infinite.lose')}</p>
				<Button
					label={t('endPage.infinite.next')}
					onClick={nextMusic}
					variant={Variant.Primary}
				/>
				<Button
					label={t('endPage.toDaily')}
					onClick={() => setIsInfinite(false)}
					variant={Variant.Primary}
				/>
			</>) : (<>
				<p className='recap-phrase'>{isWon ? t('endPage.win', { count: HEARDLE_SPLITS[gameState.attempts.length - 1] }) : t('endPage.lose')}</p>
				<Button
					label={t('endPage.share')}
					onClick={share}
					variant={Variant.Primary}
				/>
				<Button
					label={t('endPage.toInfinite')}
					onClick={() => setIsInfinite(true)}
					variant={Variant.Primary}
				/>
			</>)}
			{showCopied && (
				<p className='share-copied'>{t('endPage.copied')}</p>
			)}
		</div>
	)
}

export default Result
