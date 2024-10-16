// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WalletContract {
    // State variables
    mapping(address => uint256) public balances;
    mapping(uint256 => Transaction) public transactionHistory;
    mapping(address => address) public walletOwners;
    uint256 public transactionCount;
    address public manager;
    uint256 public walletCount;

    constructor() {
        manager = msg.sender;
    }

    // Struct to store transaction details
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string transactionType;  // New field to store the transaction type
    }

    // Events
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event CoinsAdded(address indexed user, uint256 amount);
    event CoinsSubtracted(address indexed user, uint256 amount);
    event WalletCreated(address indexed uniqueWalletAddress, address indexed user);
   

    // Create a wallet by registering the address
    function createWallet() public view returns (address) {  
        address uniqueWalletAddress = address(uint160(uint(keccak256(abi.encodePacked(msg.sender, walletCount)))));     
        return uniqueWalletAddress;
    }

    function registerWallet(address _address) public {
        walletCount++; 
        walletOwners[_address] = msg.sender;
        balances[_address] = 0;
        emit WalletCreated(_address, msg.sender);  
    }


    

    function getUserBalance(address _userAddress) public view returns (uint256) {
        uint256 balance = balances[_userAddress];
        return balance;
    }

    // Transfer coins between addresses
    function transfer(address _to,address _from, uint256 _amount) public {
        require(balances[_from] >= _amount, "Insufficient balance");
        require(balances[_to] >= 0, "Recipient wallet does not exist");

        balances[_from] -= _amount;
        balances[_to] += _amount;

        // Record transaction
        transactionCount++;
        transactionHistory[transactionCount] = Transaction({
            from: _from,
            to: _to,
            amount: _amount,
            timestamp: block.timestamp,
            transactionType: "Transfer"  // Record the transaction type as Transfer
        });

        emit Transfer(msg.sender, _to, _amount);
    }

    // Add coins to a user's wallet
    function addCoins(address _user, uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        balances[_user] += _amount;

        // Record transaction
        transactionCount++;
        transactionHistory[transactionCount] = Transaction({
            from: address(0),  // No sender for coin addition
            to: _user,
            amount: _amount,
            timestamp: block.timestamp,
            transactionType: "AddCoins"  // Record the transaction type as AddCoins
        });

        emit CoinsAdded(_user, _amount);
    }

    // Subtract coins from a user's wallet
    function subtractCoins(address _user, uint256 _amount) public {
        require(balances[_user] >= _amount, "Insufficient balance");
        require(_amount > 0, "Amount must be greater than zero");

        balances[_user] -= _amount;

        // Record transaction
        transactionCount++;
        transactionHistory[transactionCount] = Transaction({
            from: _user,
            to: address(0),  // No recipient for coin subtraction
            amount: _amount,
            timestamp: block.timestamp,
            transactionType: "SubtractCoins"  // Record the transaction type as SubtractCoins
        });

        emit CoinsSubtracted(_user, _amount);
    }

    // Get transaction history for a specific user
    function getTransactionHistory(address _user) public view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= transactionCount; i++) {
            if (transactionHistory[i].from == _user || transactionHistory[i].to == _user) {
                count++;
            }
        }

        Transaction[] memory userTransactions = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= transactionCount; i++) {
            if (transactionHistory[i].from == _user || transactionHistory[i].to == _user) {
                userTransactions[index] = transactionHistory[i];
                index++;
            }
        }

        return userTransactions;
    }

    // Get all transaction history (consider pagination or off-chain storage for large amounts)
    function getAllTransactionHistory() public view returns (Transaction[] memory) {
        Transaction[] memory allTransactions = new Transaction[](transactionCount);
        for (uint256 i = 1; i <= transactionCount; i++) {
            allTransactions[i - 1] = transactionHistory[i];
        }
        return allTransactions;
    }
}
