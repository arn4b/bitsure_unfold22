import { Button, Heading } from '@chakra-ui/react'
import React from 'react'
import doRenue from '../middleware/doRenue'

export default function Renew() {
    return (
        <div>
            <Heading>Renew Your Insurance</Heading>
            <Button onClick={() => doRenue()}>Renew your insurance</Button>
        </div>
    )
}
