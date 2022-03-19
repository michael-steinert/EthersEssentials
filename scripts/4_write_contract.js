require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID, PRIVATE_KEY} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

const account1 = "0x079441AcB5253CF6065a7361DE63E70bE6909f7a";
const account2 = "0xF6670203B4fEf108F67Ab76bb3269Aeb89C024C9";

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

/* DAI ERC20 Contract on Rinkeby */
const address = "0x95b58a6Bff3D14B7DB2f5cb5F0Ad413DC2940658";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

(async () => {
    const balance = await contract.balanceOf(account1);

    console.log(`Reading from: ${address}`);
    console.log(`Balance of Sender: ${balance}`);

    const contractWithWallet = contract.connect(wallet);

    const transaction = await contractWithWallet.transfer(account2, balance);
    /* Waiting until Transaction si put in a Block (mined) */
    await transaction.wait();
    console.log(transaction);

    const balanceOfSender = await contract.balanceOf(account1);
    const balanceOfReceiver = await contract.balanceOf(account2);

    console.log(`Sender Balance after Transaction: ${ethers.utils.formatEther(balanceOfSender)}`);
    console.log(`Receiver Balance after Transaction: ${ethers.utils.formatEther(balanceOfReceiver)}`);
})();
