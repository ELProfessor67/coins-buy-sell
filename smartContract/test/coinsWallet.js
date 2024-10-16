const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WalletContract", function () {
  describe("Depoloment",async function () {
    const walletContract = await ethers.deployContract('WalletContract');

      // Call the createWallet function and get the address
      const tx = await walletContract.createWallet();

      // Wait for the transaction to be mined and get the event logs
      const receipt = await tx.wait();

      // Assuming the createWallet function emits an event with the address,
      // you would retrieve it like this:
      // const address = receipt.events[0].args[0];
      
      console.log("address", receipt);

    // await walletContract.addCoins(address,70);

    // expect(await walletContract.balances(address)).to.equal(70)
  })
});
