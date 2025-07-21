import Answer from './endPage/Answer.tsx'
import Share from './endPage/Share.tsx'
import TimerToNext from './endPage/TimerToNext.tsx'
import AudioPlayer from './audioPlayer/AudioPlayer.tsx'
import AttemptList from './attempts/AttemptList.tsx'
import Search from './search/Search.tsx'
import { useHeardleContext } from '../context/HeardleContext.tsx'
import { HEARDLE_SPLITS } from '../config/consts.ts'
import './Content.css'

const Content = () => {
    const { gameState } = useHeardleContext()

    const isWon = gameState.attempts.some(musicId => musicId === gameState.response)
    const isFinished = isWon || gameState.attempts.length >= HEARDLE_SPLITS.length

    if (isFinished) {
        return (
            <>
                <div className='content-middle'>
                    <Answer />
                    <Share />
                    <TimerToNext />
                </div>
                <div className='content-bottom'>
                    <AudioPlayer isFinished/>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='content-middle'>
                <AttemptList />
                <div />
            </div>
            <div className='content-bottom'>
                <AudioPlayer />
                <Search />
            </div>
        </>
    )
}

export default Content
