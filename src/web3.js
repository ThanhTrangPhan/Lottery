import Web3 from "web3";

window.ethereum.request({ method: "eth_requestAccounts" });
// have all access to account 
const web3=new Web3(window.ethereum);
export default web3;