require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

const address = "0x079441AcB5253CF6065a7361DE63E70bE6909f7a";

(async () => {
    const balance = await provider.getBalance(address);
    console.log(`Ether Balance of ${address} : ${ethers.utils.formatEther(balance)} ETH`);
})();
