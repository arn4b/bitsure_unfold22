import { ethers } from 'ethers'
import store from '../store'

async function doRenue() {

    const contractAddress = '0x46a0A3202018B0ff0B3F964fAa35Eb66EefA8546'
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    console.log('Account:', await signer.getAddress())

    const erc20Interface = new ethers.utils.Interface([
        'function renue()',
    ])

    const data = erc20Interface.encodeFunctionData('renue', [
        
    ])

    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: '0x7A120',
        value: '0x16345785D8A0000',
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

export default doRenue;
