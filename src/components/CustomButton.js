import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'reactstrap'

export default function CustomButton({ handleClick, color, type, label, outline, loader, disabled, tabIndex, autoFocus, block, className }) {
    const [isButtonClick, setIsButtonClick] = useState(false)
    const [isEnterPress, setIsEnterPress] = useState(false)
    const [totalClick, setTotalClick] = useState(0)
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setIsEnterPress(true)
            setIsButtonClick(true)
        }
    }
    useEffect(() => {
        if (isButtonClick) {
            handleClick()
            setIsButtonClick(false)
        }
    }, [isButtonClick])
    const handleButtonClick = () => {
        if (isEnterPress) {
            setTotalClick(2)
        } else {
            setIsButtonClick(true)
        }
    }
    useEffect(() => {
        if (totalClick) {
            setIsEnterPress(false)
            setTotalClick(0)
        }
    }, [totalClick])

    return (
        <>
            <Button outline={outline} onKeyDown={onKeyDown} className={className} color={color} block={block} type={type} autoFocus={autoFocus} onClick={() => handleButtonClick()} tabIndex={tabIndex} disabled={disabled} >
                {loader ? <Spinner size='sm' color='primary' /> : label}
            </Button>

        </>
    )
}
