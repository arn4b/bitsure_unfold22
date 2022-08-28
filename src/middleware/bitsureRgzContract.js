import { ethers } from 'ethers'
import abi from './abi.json'
import store from '../store'

async function createInsurance(name, age, address, link, uri) {
    const contractAddress = '0x46a0A3202018B0ff0B3F964fAa35Eb66EefA8546'
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    console.log('Account:', await signer.getAddress())

    const erc20Interface = new ethers.utils.Interface([
        'function insurence(string memory _name,uint _age, string memory _address,string memory link, string memory uri)',
    ])

    let staticNFTURI =
        'https://gateway.pinata.cloud/ipfs/QmeCAKM9mkdabruyRWDFCqXW9WiLzb8fdgSGxkDLHDBHbT'

        console.log(name, age, address);

    const data = erc20Interface.encodeFunctionData('insurence', [
        name,
        age,
        address,
        link,
        staticNFTURI,
    ])

    console.log(data);

    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: '0xBEBC200',
        value: '0x16345785D8A0000',
        gasPrice: '0x12C',
        from: store.getState().walletAddress,
    }

    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
    })

    signer.sendTransaction(transaction).then(() => {})
}

export default createInsurance
