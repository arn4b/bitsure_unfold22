import { Button, Heading } from '@chakra-ui/react'
import React from 'react'
import daoReg from '../middleware/daoReg'

export default function DaoRegistration() {
    return (
        <div>
            <Heading>Register for the DAO</Heading>
            <Button onClick={() => daoReg()}>Register</Button>
        </div>
    )
}
