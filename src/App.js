import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';
import SmartContractManager from './artifacts/contracts/SmartContractManager.sol/SmartContractManager.json';

const contractAddress = "0xB302B6B760F0cb4C80C2ec597F2bF23b5294Ebc4"; // Replace with your contract address
const contractABI = SmartContractManager.abi;

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAccount, setUserAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [contractsData, setContractsData] = useState([{ address: '', description: '' }]);
  const [updateContractAddress, setUpdateContractAddress] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [removeContractAddress, setRemoveContractAddress] = useState('');
  const [newOwner, setNewOwner] = useState('');

  useEffect(() => {
    initializeProvider();
  }, []);

  async function initializeProvider() {
    if (window.ethereum) {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);

      const [account] = await tempProvider.listAccounts();
      setUserAccount(account);

      const tempContract = new ethers.Contract(contractAddress, contractABI, tempProvider.getSigner());
      setContract(tempContract);
    } else {
      setMessage("Please install MetaMask to use this application.");
    }
  }

  async function connectWallet() {
    try {
      setLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const [account] = await window.ethereum.request({ method: 'eth_accounts' });
      setUserAccount(account);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setMessage('Contract does not exist');
    } finally {
      setLoading(false);
    }
  }

  async function addContract() {
    try {
      setLoading(true);
      const contractAddresses = contractsData.map(data => data.address);
      const descriptions = contractsData.map(data => data.description);
      await contract.addContracts(contractAddresses, descriptions);
      setMessage('Contracts added successfully.');
      setContractsData([{ address: '', description: '' }]);
    } catch (error) {
      console.error('Error adding contracts:', error);
      setMessage('Failed to add contracts. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function updateContract() {
    try {
      setLoading(true);
      await contract.updateContract(updateContractAddress, updateDescription);
      setMessage('Contract updated successfully.');
      setUpdateContractAddress('');
      setUpdateDescription('');
    } catch (error) {
      console.error('Error updating contract:', error);
      setMessage('Contract does not exist');
    } finally {
      setLoading(false);
    }
  }

  async function removeContract() {
    try {
      setLoading(true);
      await contract.removeContract(removeContractAddress);
      setMessage('Contract removed successfully.');
      setRemoveContractAddress('');
    } catch (error) {
      console.error('Error removing contract:', error);
      // Parsing the error message to display a more specific message
      const errorMessage = error.data && error.data.message ? error.data.message : 'Failed to remove contract. Please try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function transferOwnership() {
    try {
      setLoading(true);
      await contract.transferOwnership(newOwner);
      setMessage('Ownership transferred successfully.');
      setNewOwner('');
    } catch (error) {
      console.error('Error transferring ownership:', error);
      setMessage('Failed to transfer ownership. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedContractsData = contractsData.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setContractsData(updatedContractsData);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Contract Manager Interface</h1>
        {!userAccount ? (
          <button onClick={connectWallet}>Connect to Wallet</button>
        ) : (
          <div>
            <div className="form-group">
              {contractsData.map((data, index) => (
                <div key={index}>
                  <input
                    name="address"
                    type="text"
                    placeholder={`Contract Address ${index + 1}`}
                    value={data.address}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  <input
                    name="description"
                    type="text"
                    placeholder={`Description ${index + 1}`}
                    value={data.description}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
              ))}
              <button onClick={() => setContractsData([...contractsData, { address: '', description: '' }])}>Insert Multiple Contract</button>
              <button onClick={addContract}>Add Contracts</button>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Update Contract Address"
                value={updateContractAddress}
                onChange={(e) => setUpdateContractAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Update Description"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
              <button onClick={updateContract}>Update Contract</button>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Remove Contract Address"
                value={removeContractAddress}
                onChange={(e) => setRemoveContractAddress(e.target.value)}
              />
              <button onClick={removeContract}>Remove Contract</button>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="New Owner Address"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
              />
              <button onClick={transferOwnership}>Transfer Ownership</button>
            </div>

            <div className="account-display">
              <p>Connected Account: {userAccount}</p>
            </div>

            {loading && <p>Loading...</p>}
            <p>{message}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
