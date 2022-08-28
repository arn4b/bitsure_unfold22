import { ethers } from 'ethers'
import store from '../store'

async function voting(id) {

    const contractAddress = '0x32915972d55f79c1e7e82afC62E22e1baAc66342'
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    console.log('Account:', await signer.getAddress())

    const erc20Interface = new ethers.utils.Interface([
        'function Approve(uint id)',
    ])

    const data = erc20Interface.encodeFunctionData('Approve', [
        id
    ])

    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: '0x7A120',
        // value: '0xDE0B6B3A7640000',
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

export default voting;
