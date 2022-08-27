import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { Input, Button } from '@chakra-ui/react'

import { useDispatch } from 'react-redux'
import { setAddress, clearAddress } from '../slice'

import { useNavigate } from 'react-router-dom'
import '../App.css'

const web3Modal = new Web3Modal({
    network: 'testnet', // optional
    cacheProvider: true, // optional
    providerOptions: {}, // required
})

export default function ConnectToWallet() {
    const [provider, setProvider] = useState()
    const [library, setLibrary] = useState()
    const [account, setAccount] = useState()
    const [signature, setSignature] = useState('')
    const [error, setError] = useState('')
    const [chainId, setChainId] = useState()
    const [network, setNetwork] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const connectToWallet = useCallback(async () => {
        try {
            const provider = await web3Modal.connect()
            const library = new ethers.providers.Web3Provider(provider)
            const accounts = await library.listAccounts()
            const network = await library.getNetwork()
            setProvider(provider)
            setLibrary(library)
            if (accounts) setAccount(accounts[0])
            dispatch(setAddress(accounts[0]))
            setChainId(network.chainId)
        } catch (error) {
            setError(error)
        }
    }, [dispatch])

    const refreshState = () => {
        setAccount()
        setChainId()
        setNetwork('')
    }

    const disconnect = useCallback(async () => {
        await web3Modal.clearCachedProvider()
        refreshState()
        dispatch(clearAddress())
    }, [dispatch])

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectToWallet()
        }
    }, [connectToWallet])

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log('accountsChanged', accounts)
                if (accounts) setAccount(accounts[0])
            }

            const handleChainChanged = (_hexChainId) => {
                setChainId(_hexChainId)
            }

            const handleDisconnect = () => {
                console.log('disconnect', error)
                disconnect()
            }

            provider.on('accountsChanged', handleAccountsChanged)
            provider.on('chainChanged', handleChainChanged)
            provider.on('disconnect', handleDisconnect)

            return () => {
                if (provider.removeListener) {
                    provider.removeListener(
                        'accountsChanged',
                        handleAccountsChanged
                    )
                    provider.removeListener('chainChanged', handleChainChanged)
                    provider.removeListener('disconnect', handleDisconnect)
                }
            }
        }
    }, [provider, disconnect, error])

    return (
        <div>
            <div className="buttonContainer">
                {
                    account
                    ? <Button onClick={disconnect}>Disconnect Wallet</Button>
                    : <Button onClick={connectToWallet}>Connect Wallet</Button>
                }
            </div>
            <div>Wallet Address: {account}</div>

            {account ? navigate('/profile') : <>oh no take insurance</>}
        </div>
    )
}
