import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../slice'
import { NFTStorage, File } from 'nft.storage'
import { Input, Button, Heading } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

import bitsureRgzInsurance from '../middleware/bitsureRgzContract'
import getData from '../middleware/getData'

const client = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORE_API_KEY,
})

async function sendDataToIPFS(attributes) {
    const metadata = await client.store({
        attributes,
        name: 'Bits',
        description: 'Bitsure NFT',
        image: new File([], 'pinpie.jpg', { type: 'image/jpg' }),
    })

    console.log(metadata.url)

    return metadata.url
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

        let staticNFTURI =
            'https://gateway.pinata.cloud/ipfs/QmeCAKM9mkdabruyRWDFCqXW9WiLzb8fdgSGxkDLHDBHbT'

        try {
            bitsureRgzInsurance(
                data.name,
                data.age,
                data.h_address,
                data.gd_link,
                staticNFTURI
            )
        } catch (error) {
            setError(error)
        }

        getDataFromAddress();
    }

    getDataFromAddress();

    async function getDataFromAddress() {
        const userDataFromWalletAddress = await getData()

        console.log(userDataFromWalletAddress);
    }

    const dispatch = useDispatch()

    const storeData = useSelector(setUserDetails)

    // const userDataFromWalletAddress = getData()

    // console.log(userDataFromWalletAddress);

    return (
        <>
            <Heading>Profile</Heading>
            {storeData.payload.userDetails ? (
                <div className='profileDetails'>
                    <Heading as='h3' size='lg'>Name: {storeData.payload.userDetails.name}</Heading>
                    <Heading as='h3' size='lg'>Age: {storeData.payload.userDetails.age}</Heading>
                    <Heading as='h3' size='lg'>Home Address: {storeData.payload.userDetails.h_address}</Heading>
                    <Heading as='h3' size='lg'>Documents Link: {storeData.payload.userDetails.gd_link}</Heading>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                    <Input
                        placeholder="Full Name"
                        {...register('name', { required: true })}
                    />
                    <Input
                        placeholder="Age"
                        {...register('age', { required: true })}
                    />
                    <Input
                        placeholder="Home Address"
                        {...register('h_address', { required: true })}
                    />
                    <Input
                        placeholder="Google Drive Link"
                        {...register('gd_link', { required: true })}
                    />

                    {errors.exampleRequired && (
                        <span>This field is required</span>
                    )}

                    <Button type="submit" colorScheme="cyan">
                        Submit
                    </Button>

                    {error && <span>Error: {error}</span>}
                </form>
            )}
        </>
    )
}
