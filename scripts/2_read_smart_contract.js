require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

/* ABI using from Ethers to interact with the Smart Contract */
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];

/* DAI Contract on Rinkeby */
const address = "0x95b58a6Bff3D14B7DB2f5cb5F0Ad413DC2940658";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

(async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();

    console.log(`Reading from ${address}`);
    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Total Supply: ${totalSupply}`);

    /* Random Account */
    const balance = await contract.balanceOf("0x95b58a6Bff3D14B7DB2f5cb5F0Ad413DC2940658")

    console.log(`Balance returned: ${balance}`);
    console.log(`Balance formatted: ${ethers.utils.formatEther(balance)}`);
})();
