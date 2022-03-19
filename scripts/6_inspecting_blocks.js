require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

(async () => {
    const block = await provider.getBlockNumber();

    console.log(`Block Number: ${block}\n`);

    const blockInfo = await provider.getBlock(block);

    console.log(blockInfo);

    const {transactions} = await provider.getBlockWithTransactions(block);

    console.log(`Logging first Transaction in Block:`);
    console.log(transactions[0]);
})();
