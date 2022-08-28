import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { setAddress } from '../slice'

export default function Home() {
    const userAddress = useSelector(setAddress)
    return (
        <div>
            <Heading>Hey {userAddress.payload.walletAddress}</Heading>
        </div>
    )
}
