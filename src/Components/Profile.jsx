import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../slice'
import { NFTStorage, File } from 'nft.storage'
import { Input, Button } from '@chakra-ui/react'

import bitsureRgzInsurance from '../middleware/bitsureRgzContract'

const client = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORE_API_KEY,
})

async function sendDataToIPFS(attributes) {
    const metadata = await client.store({
        attributes,
        name: 'Bits',
        description: 'Bitsure NFT',
        image: new File(
            [
                
            ],
            'pinpie.jpg',
            { type: 'image/jpg' }
        ),
    })

    return metadata.url;
}

export default function Profile() {

    const [error, setError] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const IPFSData = await sendDataToIPFS([data])
        
        dispatch(setUserDetails(data))

        try {
            bitsureRgzInsurance(data.name, data.age, data.h_address, data.gd_link, IPFSData);
        } catch (error) {
            setError(error)
        }
    }

    const dispatch = useDispatch()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder="Full Name"
                {...register('name', { required: true })}
            />
            <Input placeholder="Age" {...register('age', { required: true })} />
            <Input
                placeholder="Home Address"
                {...register('h_address', { required: true })}
            />
            <Input
                placeholder="Google Drive Link"
                {...register('gd_link', { required: true })}
            />

            {errors.exampleRequired && <span>This field is required</span>}

            <Button type="submit" colorScheme='cyan'>Submit</Button>

            {
                error && <span>Error: {error}</span>
            }
        </form>
    )
}
