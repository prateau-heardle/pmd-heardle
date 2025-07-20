import classNames from 'classnames'
import './Button.css'

export enum Variant {
    Primary,
    Secondary
}

type Props = {
    label: string,
    onClick: () => void,
    variant: Variant
}

const Button = ({ label, onClick, variant }: Props) => {

	return (
        <button
            className={classNames('button', { 'button--primary': variant === Variant.Primary, 'button--secondary': variant === Variant.Secondary })}
            onClick={onClick}
        >
            {label}
        </button>
	)
}

export default Button
