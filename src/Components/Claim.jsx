import { Button, Heading, Input } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'


import getClaim from '../middleware/getClaim'

export default function Claim() {
    const [error, setError] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        getClaim(data.claim_docs)
    }

    return (
        <div>
            <Heading>Claim Your Insurance</Heading>
            <Heading as='h3' size='lg'>Upload your insurance document link to claim it.</Heading>
            
            <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                <Input
                    placeholder="Claim Proof Documents Link"
                    {...register('claim_docs', { required: true })}
                />

                {errors.exampleRequired && <span>This field is required</span>}

                <Button type="submit" colorScheme="cyan">
                    Submit
                </Button>

                {error && <span>Error: {error}</span>}
            </form>
        </div>
    )
}
