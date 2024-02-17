// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SmartContractManager is Ownable {
    
    mapping(address => string) public contracts;
    uint256 public constant MAX_BATCH_SIZE = 20;  // Define the maximum batch size

    event ContractAdded(address indexed contractAddress, string description);
    event ContractUpdated(address indexed contractAddress, string newDescription);
    event ContractRemoved(address indexed contractAddress);

    constructor() Ownable() {
        // Owner is automatically set to the deployer of the contract (msg.sender) by the Ownable constructor.
    }

    function addContracts(address[] calldata _contractAddresses, string[] calldata _descriptions) external onlyOwner {
        require(_contractAddresses.length == _descriptions.length, "Array size not equal");
        require(_contractAddresses.length <= MAX_BATCH_SIZE, "Batch size max 20 allowed");  // Check against MAX_BATCH_SIZE

        for (uint i = 0; i < _contractAddresses.length; i++) {
            address contractAddress = _contractAddresses[i];
            string calldata description = _descriptions[i];

            require(contractAddress != address(0), "ContractManager: Invalid address");
            require(bytes(contracts[contractAddress]).length == 0, "Contract already exists");

            contracts[contractAddress] = description;
            emit ContractAdded(contractAddress, description);
        }
    }

    function updateContract(address _contractAddress, string calldata _newDescription) external onlyOwner {
        require(bytes(contracts[_contractAddress]).length > 0, "Contract does not exist");
        require(keccak256(bytes(contracts[_contractAddress])) != keccak256(bytes(_newDescription)), "New description is the same");

        contracts[_contractAddress] = _newDescription;
        emit ContractUpdated(_contractAddress, _newDescription);
    }

    function removeContract(address _contractAddress) external onlyOwner {
        require(bytes(contracts[_contractAddress]).length > 0, "Contract does not exist");

        delete contracts[_contractAddress];
        emit ContractRemoved(_contractAddress);
    }
}
