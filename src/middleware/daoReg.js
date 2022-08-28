import { ethers } from 'ethers'
import store from '../store'

async function daoReg() {

    const contractAddress = '0x1BCdDBd2d14f2bCf77B6f415b97e468dbbca85F7'
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    console.log('Account:', await signer.getAddress())

    const erc20Interface = new ethers.utils.Interface([
        'function regesterDaoMembers()',
    ])

    const data = erc20Interface.encodeFunctionData('regesterDaoMembers', [
        
    ])

    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: '0x7A120',
        value: '0x2C68AF0BB140000',
        // gasPrice: '0x12C',
        from: store.getState().walletAddress
    }

    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
    })

    // const contract = new ethers.Contract(contractAddress, abi, signer)

    // const tx = await contract.insurance(name, age, address, link, uri)
    // console.log(tx)

    signer.sendTransaction(transaction).then(() => {})
}

export default daoReg;
