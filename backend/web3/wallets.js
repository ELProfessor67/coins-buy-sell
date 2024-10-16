import { ethers } from 'ethers';
import { ABI } from '../ABI.js';
import { config } from 'dotenv';


config({ path: '.env' });

class Wallets {

    // Method to create a new wallet
    async createWallet() {
        try {
            const provider = new ethers.JsonRpcProvider(process.env.web3Provider);
            const wallet = new ethers.Wallet(process.env.privateKey, provider);
            const contractABI = ABI.output.abi;
           
            const contract = new ethers.Contract(process.env.contractAddress, contractABI, wallet);
           
   
            const newWalletAddress = await contract.createWallet(); // Ensure createWallet is a read-only call
            console.log(`New Wallet Address: ${newWalletAddress}`);

            // Example write function call (sending a transaction)
            const tx = await contract.registerWallet(newWalletAddress); // Register the newly created wallet
            console.log('Register Wallet:', tx.hash);

            // Wait for the transaction to be confirmed
            const receipt = await tx.wait();
            console.log('Wallet Registered Successfully:', receipt.blockNumber);

            return newWalletAddress;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    // Method to get the balance of an address
    async getBalance(address) {
        try {
            const provider = new ethers.JsonRpcProvider(process.env.web3Provider);
            const wallet = new ethers.Wallet(process.env.privateKey, provider);
            const contractABI = ABI.output.abi;
           
            const contract = new ethers.Contract(process.env.contractAddress, contractABI, wallet);

            
            const tx = await contract.getUserBalance(address);
            const balance = tx.toString();
            return balance;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }


    async addCoins(address,coins) {
        try {
            const provider = new ethers.JsonRpcProvider(process.env.web3Provider);
            const wallet = new ethers.Wallet(process.env.privateKey, provider);
            const contractABI = ABI.output.abi;
           
            const contract = new ethers.Contract(process.env.contractAddress, contractABI, wallet);

            const tx = await contract.addCoins(address,coins);
            const receipt = await tx.wait();
            console.log('money add sucessfully',receipt.blockNumber);

            const balance = await contract.getUserBalance(address);
            console.log(address, balance.toString());
            
        }catch(error) {
            console.log(`Error: ${error.message}`);
        }
    }


    async subtractCoins(address,coins) {
        try {
            const provider = new ethers.JsonRpcProvider(process.env.web3Provider);
            const wallet = new ethers.Wallet(process.env.privateKey, provider);
            const contractABI = ABI.output.abi;
           
            const contract = new ethers.Contract(process.env.contractAddress, contractABI, wallet);

            const tx = await contract.subtractCoins(address,coins);
            const receipt = await tx.wait();
            console.log('money subtract sucessfully',receipt.blockNumber);

            const balance = await contract.getUserBalance(address);
            console.log(address, balance.toString());
            
        }catch(error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

// Instantiate the Wallets class
const wallet = new Wallets();
export default wallet;
