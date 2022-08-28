import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Redirect } from 'react-router-dom'

import { toHex, truncateAddress } from './utils'

import { Container, Tooltip } from '@chakra-ui/react'

import { NFTStorage, File } from 'nft.storage'
import ConnectToWallet from './Components/ConnectToWallet'
import Profile from './Components/Profile'

import {
    BsHouse,
    BsPersonCheck,
    BsWallet,
    BsShieldCheck,
    BsBagCheck,
    BsXDiamond,
} from 'react-icons/bs'
import Home from './Components/Home'
import Claim from './Components/Claim'
import Renew from './Components/Renew'
import DaoRegistration from './Components/DaoRegistration'
import ApproveClaim from './Components/ApproveClaim'

function App() {
    return (
        <Container maxW="2xl">
            <div className="App">
                <div className="topNav">
                    <Tooltip label="Home">
                        <Link to={'/home'}>
                            <span>
                                <BsHouse />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip label="Profile">
                        <Link to={'/profile'}>
                            <span>
                                <BsPersonCheck />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip label="Wallet">
                        <span>
                            <BsWallet />
                        </span>
                    </Tooltip>
                    <Tooltip label="Insurance">
                        <Link to={'/claim'}>
                            <span>
                                <BsShieldCheck />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip label="Register for DAO">
                        <Link to={'/daoreg'}>
                            <span>
                                <BsBagCheck />
                            </span>
                        </Link>
                    </Tooltip>
                    <Tooltip label="Renew NFT">
                        <Link to={'/renew'}>
                            <span>
                                <BsXDiamond />
                            </span>
                        </Link>
                    </Tooltip>
                </div>
                <ConnectToWallet />

                <Routes>
                    <Route path="profile" exact element={<Profile />} />
                </Routes>

                <Routes>
                    <Route path="home" exact element={<Home />} />
                </Routes>

                <Routes>
                    <Route path="claim" exact element={<Claim />} />
                </Routes>

                <Routes>
                    <Route path="renew" exact element={<Renew />} />
                </Routes>

                <Routes>
                    <Route path="daoreg" exact element={<DaoRegistration />} />
                </Routes>

                <Routes>
                    <Route
                        path="approveclaims"
                        exact
                        element={<ApproveClaim />}
                    />
                </Routes>
            </div>
        </Container>
    )
}

export default App
