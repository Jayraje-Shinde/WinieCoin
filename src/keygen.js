const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log("Public Key: " + publicKey);
console.log("Private Key: " + privateKey);

//Public Key: 0402e54515575322756fef7cb608a1f5e67e05681f6f4ccfd7bdf604cd178bd7eae39842074fb6e02053099c437583ea7d5607bc7c1be9cd06538fedbfd83441e6
//Private Key: 80f18b6cff39c6a35c6a23d91a7e831840d85aa87b9ec049811df206f8b4d229