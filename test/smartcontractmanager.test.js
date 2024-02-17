const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SmartContractManager', function () {
  let ContractManager;
  let contractManager;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    ContractManager = await ethers.getContractFactory('SmartContractManager');
    contractManager = await ContractManager.deploy();
    await contractManager.deployed();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await contractManager.owner()).to.equal(owner.address);
    });
  });

  describe('Add Contracts', function () {
    it('Should let the owner add contracts', async function () {
      await contractManager.addContracts(['0x0000000000000000000000000000000000000001'], ['Contract 1']);
      const description = await contractManager.contracts('0x0000000000000000000000000000000000000001');
      expect(description).to.equal('Contract 1');
    });

    it('Should allow adding contracts with empty arrays', async function () {
      await contractManager.addContracts([], []);
      // No contracts to verify, but transaction should succeed without reverting
    });

    it('Should fail if non-owner tries to add contracts', async function () {
      await expect(contractManager.connect(addr1).addContracts(['0x0000000000000000000000000000000000000002'], ['Contract 2']))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should fail when adding a contract with an existing address', async function () {
      await contractManager.addContracts(['0x0000000000000000000000000000000000000003'], ['Initial Contract']);
      await expect(contractManager.addContracts(['0x0000000000000000000000000000000000000003'], ['Duplicate Contract']))
        .to.be.revertedWith('Contract already exists');
    });
  });

  describe('Update Contracts', function () {
    beforeEach(async function () {
      await contractManager.addContracts(['0x0000000000000000000000000000000000000004'], ['Initial Description']);
    });

    it('Should let the owner update contracts', async function () {
      await contractManager.updateContract('0x0000000000000000000000000000000000000004', 'Updated Description');
      const description = await contractManager.contracts('0x0000000000000000000000000000000000000004');
      expect(description).to.equal('Updated Description');
    });

    it('Should fail when updating a contract to its current description', async function () {
      await expect(contractManager.updateContract('0x0000000000000000000000000000000000000004', 'Initial Description'))
        .to.be.revertedWith('New description is the same');
    });

    it('Should fail if non-owner tries to update contracts', async function () {
      await expect(contractManager.connect(addr1).updateContract('0x0000000000000000000000000000000000000004', 'Non-owner Update'))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Remove Contracts', function () {
    beforeEach(async function () {
      await contractManager.addContracts(['0x0000000000000000000000000000000000000005'], ['Removable']);
    });

    it('Should let the owner remove contracts', async function () {
      await contractManager.removeContract('0x0000000000000000000000000000000000000005');
      const description = await contractManager.contracts('0x0000000000000000000000000000000000000005');
      expect(description).to.equal('');
    });

    it('Should fail if non-owner tries to remove contracts', async function () {
      await expect(contractManager.connect(addr1).removeContract('0x0000000000000000000000000000000000000005'))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Ownership', function () {
    it('Should transfer ownership', async function () {
      await contractManager.transferOwnership(addr1.address);
      expect(await contractManager.owner()).to.equal(addr1.address);
    });

    it('Should fail if non-owner tries to transfer ownership', async function () {
      await expect(contractManager.connect(addr2).transferOwnership(addr1.address))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});