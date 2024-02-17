
require('dotenv').config()
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");
require('solidity-coverage');





const { ALCHEMY_API_KEY, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  paths: {
    artifacts: './src/artifacts',
  },

  networks: {
    hardhat: {
      chainId: 1337
    },
    polygon_mumbai: {
      url: process.env.ALCHEMY_API_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
    
  },

  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },

  solidity: "0.8.20"
};
// "0xB302B6B760F0cb4C80C2ec597F2bF23b5294Ebc4" contract deployed at this address

// "npx hardhat run scripts/verify.js --network polygon_mumbai"
// "npx hardhat run scripts/deploy.js --network polygon_mumbai"