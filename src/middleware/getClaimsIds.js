
import { ethers } from 'ethers';
import abi from './abi.json'

async function getClaimsIds(){

let contractAddress = '0x46a0A3202018B0ff0B3F964fAa35Eb66EefA8546';
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

const contract = new ethers.Contract(contractAddress, abi, provider);

const data = await contract.getClaimArray();

return data;

}

export default getClaimsIds;



