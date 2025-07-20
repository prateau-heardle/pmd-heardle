import * as React from 'react'
import { createPortal } from 'react-dom'
import './Modale.css'
import CrossIcon from '../../img/cross.svg?react'

type Props = {
    title: string,
    isOpen: boolean,
    onClose: () => void
}

const Modale = ({ title, isOpen, onClose, children }: React.PropsWithChildren<Props>) => {
    if (!isOpen) {
        return null
    }

    return createPortal(
        <div className='modale-overlay' onClick={onClose}>
            <div className='modale-container' onClick={e => e.stopPropagation()}>
                <div className='modale-header'>
                    <div />
                    <h2 className='modale-title'>{title}</h2>
                    <CrossIcon role='button' className='modale-close-icon' onClick={onClose}/>
                </div>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Modale