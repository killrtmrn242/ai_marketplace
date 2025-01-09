
# AI Model Marketplace

Welcome to the **AI Model Marketplace**. This platform allows users to list, purchase, rate, and view AI models stored on the Ethereum blockchain. The marketplace interacts with a smart contract, and Web3.js is used to communicate with the Ethereum blockchain.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Smart Contract Functions](#smart-contract-functions)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Interacting with the Smart Contract](#interacting-with-the-smart-contract)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The AI Model Marketplace is a decentralized platform where users can:

- **List** their AI models for sale.
- **Purchase** AI models using Ethereum.
- **Rate** AI models to help other users make informed decisions.
- **View** detailed information about each model.

The application integrates with the Ethereum blockchain using Web3.js to interact with the deployed smart contract.

## Features

- List AI models with a name, description, and price.
- Purchase AI models directly through the smart contract.
- Rate AI models after purchase.
- View model details including name, description, price, creator, and average rating.
- Withdraw funds accumulated from purchases.

## Technology Stack

- **Frontend**: HTML, JavaScript
- **Blockchain**: Ethereum (via Web3.js)
- **Smart Contract**: Solidity (deployed on the Ethereum blockchain)
- **Web3.js**: Library for interacting with the Ethereum blockchain
- **Web Browser**: Chrome, Firefox, or any other browser that supports MetaMask (or any other Ethereum wallet extension)

## Smart Contract Functions

The smart contract deployed at the address `0x660Fd3F4155e819287933d2d3cD45299939B2302` includes the following functions:

- **listModel**: Lists a new AI model with a name, description, and price.
- **purchaseModel**: Allows users to purchase an AI model using Ethereum.
- **rateModel**: Allows users to rate an AI model after purchasing it.
- **withdrawFunds**: Allows the creator to withdraw accumulated funds from model purchases.
- **getModelDetails**: Returns the details of a model, including its name, description, price, creator, and average rating.

## Setup and Installation

### Prerequisites

Before running this project, ensure you have the following:

- **Node.js** installed on your machine (v14 or later).
- **MetaMask** or any other Ethereum wallet extension installed in your browser.
- **Ganache** or any other local Ethereum test network (for testing purposes).
- **Web3.js** library to interact with Ethereum (this is included in the project).

### Installing Dependencies

1. Clone the repository to your local machine:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-model-marketplace
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Ensure that your Ethereum wallet (e.g., MetaMask) is connected to the test network (e.g., Ganache).
2. Open the `index.html` file in your browser to load the AI Model Marketplace interface.

## Interacting with the Smart Contract

The frontend interacts with the smart contract using the Web3.js library. You can perform the following actions:

- **List a model** by entering the name, description, and price, and clicking the "List Model" button.
- **Purchase a model** by clicking the "Purchase Model" button next to any listed model.
- **Rate a model** after purchase by clicking the "Rate Model" button and entering a rating value.
- **Withdraw funds** from the contract by clicking the "Withdraw Funds" button.
- **View model details** by clicking the "View Model Details" button.

## Usage

- On the homepage, you will find buttons to list models, purchase models, rate models, and withdraw funds.
- After listing a model, it will appear in the "Available Models" section, where you can view details and purchase it.
- Clicking the "View Model Details" button will display the model's name, description, price, creator, and average rating.

## Troubleshooting

- **No connection to MetaMask**: Ensure MetaMask is installed and connected to the correct Ethereum network (e.g., Ganache).
- **Error while listing a model**: Check if your Ethereum wallet has enough funds for gas fees.
- **Error while purchasing or rating**: Ensure the smart contract is deployed correctly and your Ethereum wallet is unlocked.

## Contributing

If you would like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Ensure all code follows the existing style and includes proper documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
