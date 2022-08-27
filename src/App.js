import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Redirect } from 'react-router-dom'

import { toHex, truncateAddress } from './utils'

import { Container } from '@chakra-ui/react'

import { NFTStorage, File } from 'nft.storage'
import ConnectToWallet from './Components/ConnectToWallet'
import Profile from './Components/Profile'

import { BsHouse, BsPersonCheck, BsWallet, BsShieldCheck, BsBagCheck, BsXDiamond } from 'react-icons/bs'

function App() {
    return (
        <Container maxW='2xl'>
            <div className="App">
              <div className='topNav'>
                <span><BsHouse /></span>
                <span><BsPersonCheck /></span>
                <span><BsWallet /></span>
                <span><BsShieldCheck /></span>
                <span><BsBagCheck /></span>
                <span><BsXDiamond /></span>
              </div>
                <ConnectToWallet />

                <Routes>
                    <Route path="profile" exact element={<Profile />} />
                </Routes>
            </div>
        </Container>
    )
}

export default App
