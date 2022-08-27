import React from 'react'
import { useState, useEffect } from 'react'
import Web3Modal, { disconnect } from 'web3modal'
import { ethers } from 'ethers'

import { useNavigate } from 'react-router-dom'

import { toHex, truncateAddress } from '../utils'

const providerOptions = {
    /* See Provider Options Section */
}

const web3Modal = new Web3Modal({
    network: 'testnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
})

export default function ConnecteToWallet() {
    const [provider, setProvider] = useState()
    const [library, setLibrary] = useState()
    const [account, setAccount] = useState()
    const [signature, setSignature] = useState('')
    const [error, setError] = useState('')
    const [chainId, setChainId] = useState()
    const [network, setNetwork] = useState()
    const [message, setMessage] = useState('')
    const [signedMessage, setSignedMessage] = useState('')
    const [verified, setVerified] = useState()

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect()
            const library = new ethers.providers.Web3Provider(provider)
            const accounts = await library.listAccounts()
            const network = await library.getNetwork()
            setProvider(provider)
            setLibrary(library)
            if (accounts) setAccount(accounts[0])
            setChainId(network.chainId)
        } catch (error) {
            setError(error)
        }
    }

    // const handleNetwork = (e) => {
    //     const id = e.target.value
    //     setNetwork(Number(id))
    // }

    // const handleInput = (e) => {
    //     const msg = e.target.value
    //     setMessage(msg)
    // }

    // const signMessage = async () => {
    //     if (!library) return
    //     try {
    //         const signature = await library.provider.request({
    //             method: 'personal_sign',
    //             params: [message, account],
    //         })
    //         setSignedMessage(message)
    //         setSignature(signature)
    //     } catch (error) {
    //         setError(error)
    //     }
    // }

    // const verifyMessage = async () => {
    //     if (!library) return
    //     try {
    //         const verify = await library.provider.request({
    //             method: 'personal_ecRecover',
    //             params: [signedMessage, signature],
    //         })
    //         setVerified(verify === account.toLowerCase())
    //     } catch (error) {
    //         setError(error)
    //     }
    // }

    const refreshState = () => {
        setAccount()
        setChainId()
        setNetwork('')
        setMessage('')
        setSignature('')
        setVerified(undefined)
    }

    const disconnect = async () => {
        await web3Modal.clearCachedProvider()
        refreshState()
    }

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet()
        }
    }, [])

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
    }, [provider])

    let navigate = useNavigate()

    return (
        <div className="App">
            <button onClick={connectWallet}>Connect Wallet</button>
            <button onClick={disconnect}>Disconnect Wallet</button>
            <div>Connection Status: {!!account}</div>
            <div>Wallet Address: {account}</div>

            {account ? navigate('/profile') : <>oh no take insurance</>}
        </div>
    )
}
