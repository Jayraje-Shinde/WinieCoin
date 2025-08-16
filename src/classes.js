const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
class transaction {
  constructor(fromAddress, toAddress, amt) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amt = amt;
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amt).toString();
  }

  signTransaction(signingKey) {

    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets');
    }

    const hashTx = this.calculateHash();
    const sign = signingKey.sign(hashTx, 'base64');
    this.signature = sign.toDER('hex');
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length == 0) {
      throw new Error("excuse me bro where is the signature");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}


class Block {
  constructor(timestamp, transaction, prevHash = '') {
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.prevHash = prevHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
  }

  mineblock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("block mined: " + this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transaction) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }

}
class blockChain {

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.mining_reward = 100;
  }

  createGenesisBlock() {
    return new Block(0, "15-08-2025", "Genesis block", "0");
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineblock(this.difficulty);
    console.log("Block mined Successfully");
    this.chain.push(block);
    this.pendingTransactions = [
      new transaction(null, miningRewardAddress, this.mining_reward),
    ];
  }

  addTransaction(transaction) {

    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("It needs to have both address");
    }

    if (!transaction.isValid()) {
      throw new Error("It needs to be a valid transaction");

    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transaction) {
        if (trans.fromAddress === address) {
          balance -= trans.amt;
        }
        if (trans.toAddress === address) {
          balance += trans.amt;
        }
      }
    }

    return balance;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.mineblock(this.difficulty);
    this.chain.push(newBlock);
  }
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash())
        return false

      if (currentBlock.prevHash !== prevBlock.hash)
        return false
    }
    return true;
  }

}
module.exports.blockChain = blockChain;
module.exports.transaction = transaction;
