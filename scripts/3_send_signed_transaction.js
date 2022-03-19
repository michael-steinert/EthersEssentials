require("dotenv").config();
const {ethers} = require("ethers");

const {INFURA_ID, PRIVATE_KEY} = process.env;

/* The JSON-RPC API is a Method for interacting with Ethereum and is available in all Ethereum Node Implementations as well as Third-Party Web Services */
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${INFURA_ID}`);

const account1 = "0x079441AcB5253CF6065a7361DE63E70bE6909f7a";
const account2 = "0xF6670203B4fEf108F67Ab76bb3269Aeb89C024C9";

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

(async () => {
    const senderBalanceBefore = await provider.getBalance(account1);
    const receiverBalanceBefore = await provider.getBalance(account2);

    console.log(`Sender Balance before Transaction: ${ethers.utils.formatEther(senderBalanceBefore)}`);
    console.log(`Receiver Balance before Transaction: ${ethers.utils.formatEther(receiverBalanceBefore)}`);

    const transferTransaction = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    });

    /* Waiting until Transaction si put in a Block (mined) */
    await transferTransaction.wait();
    console.log(transferTransaction);

    const senderBalanceAfter = await provider.getBalance(account1);
    const receiverBalanceAfter = await provider.getBalance(account2);

    console.log(`Sender Balance after Transaction: ${ethers.utils.formatEther(senderBalanceAfter)}`);
    console.log(`Receiver Balance after Transaction: ${ethers.utils.formatEther(receiverBalanceAfter)}`);
})();
