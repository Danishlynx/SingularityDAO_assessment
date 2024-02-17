const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
async function main() {

// Verify the contract after deploying
await hre.run("verify:verify", {
address: "0xB302B6B760F0cb4C80C2ec597F2bF23b5294Ebc4",
constructorArguments: [],
});
}
// Call the main function and catch if there is any error
main()
.then(() => process.exit(0))
.catch((error) => {
console.error(error);
process.exit(1);
});