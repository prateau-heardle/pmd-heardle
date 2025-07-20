import Lottie from 'lottie-react'
import './PlayButton.css'
import PlayIcon from '../../img/play.svg?react'
import playAnimation from '../../img/playAnimation.json'

type Props = {
    startMusic: () => void,
    stopMusic: () => void,
    isPlaying: boolean
}

const PlayButton = ({ startMusic, stopMusic, isPlaying }: Props) => {
	const toggleMusic = () => {
		if (isPlaying) {
			stopMusic()
		} else {
			startMusic()
		}
	}

	return (
		<button onClick={toggleMusic} className='play-button'>
            {isPlaying ? (
                <Lottie
                    className='play-button-icon'
                    animationData={playAnimation}
                    loop
                />
            ) : <PlayIcon className='play-button-icon play-button-icon-play' />}
        </button>
	)
}

export default PlayButton
