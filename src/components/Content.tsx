import Answer from './Answer.tsx'
import Share from './Share.tsx'
import TimerToNext from './TimerToNext.tsx'
import AudioPlayer from './audioPlayer/AudioPlayer.tsx'
import AttemptList from './attempts/AttemptList.tsx'
import Search from './search/Search.tsx'
import { useHeardleContext } from '../context/HeardleContext.tsx'
import { HEARDLE_SPLITS } from '../config/consts.ts'

const Content = () => {
    const { gameState } = useHeardleContext()

    const isWon = gameState.attempts.some(musicId => musicId === gameState.response)
    const isFinished = isWon || gameState.attempts.length >= HEARDLE_SPLITS.length

    if (isFinished) {
        return (
            <>
                <Answer />
                <Share />
                <TimerToNext />
                <AudioPlayer isFinished/>
            </>
        )
    }

    return (
        <>
            <AttemptList />
            <AudioPlayer />
            <Search />
        </>
    )
}

export default Content
