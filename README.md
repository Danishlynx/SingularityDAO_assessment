# SmartContractManager Documentation


## 1. Introduction

The `SmartContractManager` is a sophisticated Solidity smart contract designed for streamlined management of contract addresses and their associated metadata within a decentralized framework. This contract utilizes advanced data structures, batch processing, and rigorous access control mechanisms to ensure optimal performance, security, and ease of use.

## 2. Contract Functionalities

### Overview of Functions

#### `addContracts(address[] calldata _contractAddresses, string[] calldata _descriptions)`

- **Objective:** Enables batch addition of multiple contract addresses and their descriptions to optimize transaction efficiency and minimize gas costs.
- **Access Control:** Exclusively callable by the contract owner to maintain data integrity and prevent unauthorized entries.
- **Implementation Details:** Utilizes array inputs for batch processing, with validation for array size equality, adherence to `MAX_BATCH_SIZE`, and the uniqueness of contract addresses.

### Batch Operations

- **Rationale:** Batch operations allow the contract owner to add multiple contract addresses and descriptions in a single transaction, reducing costs and time for managing numerous contracts, enhancing scalability.
- **Implementation Details:** Iterates over input arrays, applying checks and adding each contract to the mapping within practical gas limits enforced by `MAX_BATCH_SIZE`.

#### `updateContract(address _contractAddress, string calldata _newDescription)`

- **Objective:** Updates a contract's description to keep data current and accurate.
- **Access Control:** Restricted to the owner, reinforcing the security of data management.
- **Implementation Details:** Verifies the contract's existence and that the new description constitutes a change.

#### `removeContract(address _contractAddress)`

- **Objective:** Removes a contract address and its description, adding flexibility in managing the contract list.
- **Access Control:** Owner-restricted to prevent unauthorized deletions.
- **Implementation Details:** Confirms the contract address's existence before removal, ensuring clean deletion from storage.

## 3. Testing Approach

The test suite ensures the robustness and reliability of the `SmartContractManager` by covering all functionalities:

### Deployment Verification

- **Purpose:** Confirms correct contract deployment and owner assignment, providing a secure foundation for operations.

### Batch Additions and Modifications

- **Purpose:** Validates batch addition functionality under various scenarios, including boundary conditions, to ensure efficiency and correctness.

### Access Control and Security

- **Purpose:** Ensures all functions enforce proper access control, allowing only the owner to execute critical operations, thus maintaining integrity.

### Edge Case Handling

- **Purpose:** Evaluates the contract's handling of edge cases like empty arrays and reaching `MAX_BATCH_SIZE`, ensuring reliability under all conditions.

### Test Coverage Metrics

- **Statement Coverage:** 100% - Every statement in the contract code has been executed by the tests.
- **Branch Coverage:** 75% - Indicates the coverage of conditional branches.
- **Function Coverage:** 100% - All functions in the contract have been invoked during testing.
- **Line Coverage:** 100% - Each line of code in the contract has been executed by the tests.

## 4. Design Rationale

### Data Structures

- **Mapping (address => string):** Selected for O(1) complexity in lookups, efficiently associating contract addresses with descriptions while preventing duplicates.

### Batch Processing

- **Use of Arrays:** Facilitates batch operations, reducing transaction count and gas costs for managing multiple contracts, with `MAX_BATCH_SIZE` preventing excessive gas consumption.

### Access Control

- **Inheritance from Ownable:** Employs OpenZeppelin's Ownable for a secure, standardized approach to access control, restricting sensitive functions to the owner.

## 5. Security Considerations

- **Input Validation:** Ensures transaction integrity with rigorous checks on input validity and constraints, mitigating common vulnerabilities.
- **Gas Optimization:** Utilizes batch processing and efficient data structures for cost-effective operations.
- **Event Logging:** Provides transparency and aids in off-chain monitoring and auditing, enhancing security.

## 6. Conclusion

The `SmartContractManager` contract is a prime example of advanced blockchain development, showcasing best practices in data management, batch processing, and security. Its thoughtful design and implementation ensure it is well-equipped to meet the sophisticated needs of decentralized applications.

# Deployment( I have made a temporary front-end for better engagement with contract):

```
Live Wesbite availabel on : https://singularity-dao-assessment-zawj.vercel.app/
```
To do any funciton on the above website , you need to be the owner of contract, just send me your metamsk address stmy email id, and i will transfer ownership to you 
```
danishlynx@gmail.com
```
Esle, you can start your own local deployment by doing the follwing:

## User must have a Metamask account.
Connect to Mumbai Testnet
```
https://chainlist.org/chain/80001
```
## Get some test tokens:
```
https://www.alchemy.com/faucets/polygon-mumbai
```

## 1. Clone the repo:
```
 git clone https://github.com/Danishlynx/SingularityDAO_assessment
```
## 2. Install Dependencies:
```
npm install
```
## 3. Compile the Contract: The compiled code will be stored in src folder:
```
npx hardhat compile
```
## 4. For testing the smart contract:
```
npx hardhat test
```
## 5. For checking the coverage of test:
```
npx hardhat coverage
```
## 6. Create a .env file with follwoing particulars:
```
ALCHEMY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx(enter your alchemy app api key)
PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx(enter your metamask account's private key)
POLYGONSCAN_API_KEY=xxxxxxxxxxxxxxxxxxxxx(enter your polygonscan api key for contract verification)
```
## 7. Contract Deployment:
```
npx hardhat run scripts/deploy.js --network polygon_mumbai
```
## 8. Contract Verification:Grab the address of contract fro console and place it in the verify.js script:
```
npx hardhat run scripts/verify.js --network polygon_mumbai
```
## 9. Place the contract code in the src--> app.js

To start the app
```
npm start
```

Both the react fron-end or polygon scan explorer can be used to interact wiht contract(please verify contract for that). While interacting with front-end please use the account which you ahve used for deployment of contract.

You can always try the react app to interact with contract, but optionally, you have both hardhat node or remix ide as well to serve you.

![Screenshot 2024-02-17 133257](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/2948da8a-3a86-40a4-8024-7582ddff4e6f)
![Screenshot 2024-02-17 132841](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/af21995f-f1b7-43d9-99e6-6fe0d9dd4ea0)
![Screenshot 2024-02-17 132836](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/d30e3417-75d2-444c-8233-85c8f6dff3a1)
![Screenshot 2024-02-17 132824](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/57ea7bc2-84a5-4970-b4b5-c57acc2e01c7)
![Screenshot 2024-02-17 132745](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/1101dac8-82e6-42a5-b187-bee728e12da0)
![Screenshot 2024-02-17 133831](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/9e2cda6d-3606-4aad-930d-36050cf0d943)
![Screenshot 2024-02-17 133812](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/b6c21038-d74b-41df-b11e-3039cab36654)
![Screenshot 2024-02-17 133653](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/3f562083-b6ca-47e7-90e1-a879a55dded6)
![Screenshot 2024-02-17 133312](https://github.com/Danishlynx/SingularityDAO_assessment/assets/69537135/847c9bb7-6cba-4a04-b94d-33e7b4ea989b)
