const { blockChain, transaction } = require('./classes.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate("80f18b6cff39c6a35c6a23d91a7e831840d85aa87b9ec049811df206f8b4d229");
const myWalletAddress = myKey.getPublic('hex');




let winieCoin = new blockChain();

const tx1 = new transaction(myWalletAddress, "new public key", 10);
tx1.signTransaction(myKey);
winieCoin.addTransaction(tx1);
console.log("mining started");
winieCoin.minePendingTransactions(myWalletAddress);

console.log(winieCoin.getBalanceOfAddress(myWalletAddress));

console.log(winieCoin.isChainValid());



