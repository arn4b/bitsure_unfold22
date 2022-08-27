import { ethers } from 'ethers';
import abi from './abi.json'

async function createInsurence(name,age,address,link,uri){

let contractAddress;
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
console.log("Account:", await signer.getAddress());

// const erc20Interface = new ethers.utils.Interface([
//     'function insurence(string memory _name,uint _age, string memory _address,string memory link, string memory uri)'
//   ])

//   const data = erc20Interface.encodeFunctionData(
//     'insurence', [name,age,Homeaddress,link,uri]
//   )

const contract = new ethers.Contract(daiAddress, abi, provider);

const tx = await contract.insurence(name,age,address,link,uri);
console.log(tx);
}

export default createInsurence;