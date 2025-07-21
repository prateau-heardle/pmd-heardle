import * as React from 'react'
import { useTranslation } from 'react-i18next'
import './TimerToNext.css'
import { padStartNumber } from '../../config/utils'

const TimerToNext = () => {
	const { t } = useTranslation()
	const [currentDate, setCurrentDate] = React.useState(new Date())

	React.useEffect(() => {
		setInterval(() => {
			setCurrentDate(new Date())
		}, 1000)
	}, [])

	const countdown = `${padStartNumber(23 -currentDate.getHours())}:${padStartNumber(59-currentDate.getMinutes())}:${padStartNumber(59-currentDate.getSeconds())}`

	return (
		<div className='timer'>
			<p className='timer-text'>{t('endPage.timer')}</p>
			<p className='timer-clock'>
				{countdown}
			</p>
		</div>
	)
}

export default TimerToNext
