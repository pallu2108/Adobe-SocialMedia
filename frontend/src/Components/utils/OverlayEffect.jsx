import { ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const OverlayEffect = () => {
    return (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )
}
export default OverlayEffect
