import { ethers } from 'ethers'
import abi from './abi.json'
import store from '../store'

async function createInsurance(name, age, address, link, uri) {
    const contractAddress = '0x1BCdDBd2d14f2bCf77B6f415b97e468dbbca85F7'
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
