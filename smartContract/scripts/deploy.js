const main = async () => {
    const WalletContract = await hre.ethers.getContractFactory("WalletContract");
    const walletContract = await WalletContract.deploy();
  
    await walletContract.deployed();
  
    console.log("WalletContract address: ", walletContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();