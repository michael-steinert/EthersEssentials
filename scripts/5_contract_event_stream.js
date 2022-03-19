require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

/* LINK ERC20 Contract on Rinkeby */
const address = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

(async () => {
    /* Getting the latest Block Number */
    const block = await provider.getBlockNumber();

    /* Return Events that match the Transfer Event in the last two Blocks */
    const transferEvents = await contract.queryFilter("Transfer", block - 2, block);
    console.log(transferEvents);
})();
