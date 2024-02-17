const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );


  const SmartContractManager = await hre.ethers.getContractFactory("SmartContractManager");
  const smartcontractmanager = await SmartContractManager.deploy();

  await smartcontractmanager.deployed();

  console.log("Token deployed to:", smartcontractmanager.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });