require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  // defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    Sepolia: {
      url: 'https://arb-sepolia.g.alchemy.com/v2/q6BnMXUhAMEJ4wXMXZKXOFmNBycoMk9s',
      accounts: ['a06ba9acc03c05a472da4c6d956727f4b8789cf2d369b1d50f695c7519387c0b']
    },
    opbnb: {
      url: 'https://opbnb-testnet.infura.io/v3/8ef821384e5b4eadb1150f5738e067f4',
      accounts: ['a06ba9acc03c05a472da4c6d956727f4b8789cf2d369b1d50f695c7519387c0b']
    }
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './chache',
    artifacts: './artifacts',
    
  }
};
