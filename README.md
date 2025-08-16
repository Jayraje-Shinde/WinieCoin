
---

## ✨ Features

- **Transactions**
  - Each transaction has a `fromAddress`, `toAddress`, and `amount`.
  - Transactions are signed using **Elliptic Curve Cryptography (secp256k1)**.
  - Invalid or unsigned transactions are rejected.

- **Blocks**
  - Contain transactions, timestamp, previous hash, and nonce.
  - Each block is linked to the previous one (forming a chain).
  - Proof-of-Work mining ensures integrity by requiring hashes with leading zeros.

- **Blockchain**
  - Supports mining with a configurable difficulty.
  - Maintains a pool of pending transactions.
  - Awards a **mining reward** to incentivize miners.
  - Provides `getBalanceOfAddress(address)` to check wallet balances.
  - Verifies chain integrity with `isChainValid()`.

- **Wallet**
  - Generate your own **Public/Private keypair**.
  - Use private keys to sign transactions.
  - Public keys act as wallet addresses.

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (version 14+ recommended)
- npm (comes with Node.js)

---

## 🚀 Setup & Installation

1. **Clone this repo**
   ```bash
   git clone git@github.com:your-username/winiecoin.git
   cd winiecoin
2. **Install dependencies**
   ```bash
   npm install crypto-js elliptic

3. **Generate Key Pair**
   ```bash
   node ./src/keygen.js
This Prints out:
   ```bash
   Public Key: <your-public-key>
   Private Key: <your-private-key>
   ```
Public Key → use this as your wallet address.
Private Key → keep this safe and never share it!

after these just change 
```bash
const myKey = ec.keyFromPrivate("your-private-key-here");
```

4. **Run main.js**
   ```bash
   node ./src/main.js
   ```
now u can play around by changing test code as there is no ui or frontend for this

**________________________________________________________**



#⚙️ How It Works (Under the Hood)

**Transaction Signing**
Each transaction is hashed and signed with the sender’s private key.
Anyone can verify the signature using the sender’s public key.

**Block Mining**
Blocks are mined using Proof-of-Work: the block hash must start with a number of zeros equal to the difficulty.

**Consensus**
Validity of the chain is ensured by verifying:

1.Each block’s hash is correct.
2.Each block correctly references the previous hash.
3.All transactions are validly signed.

**________________________________________________________**
#👨‍💻 Contributing

Contributions are welcome!
If you’d like to:

Fix bugs

Add new features (e.g., peer-to-peer network, difficulty adjustment)

Improve documentation

Just fork the repo and open a Pull Request.
