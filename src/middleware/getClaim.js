import { ethers } from 'ethers'


async function getClaim(link) {

    const contractAddress = '0x32915972d55f79c1e7e82afC62E22e1baAc66342'
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    console.log('Account:', await signer.getAddress())

    const userWalletAddress = '0x09f15B6ab2D7FAcBb3b4De98624A1D9433aDB547';

    const erc20Interface = new ethers.utils.Interface([
        'function claim(string calldata link)',
    ])

    const data = erc20Interface.encodeFunctionData('insurence', [
        link
    ])

    const transaction = {
        to: contractAddress,
        data: data,
        gasLimit: '0x7A120',
        // value: '0x16345785D8A0000',
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

export default createInsurance
