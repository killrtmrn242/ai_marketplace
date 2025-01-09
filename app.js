const web3 = new Web3("http://127.0.0.1:7545");
let contract;

const init = async () => {
    // Получаем список аккаунтов из web3
    const accounts = await web3.eth.getAccounts();
    
    if (accounts.length === 0) {
        alert("No accounts found. Please check your wallet.");
        return;
    }

    const abi = [
        {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "modelPurchasers",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "models",
            "outputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "uint8",
                "name": "ratingSum",
                "type": "uint8"
              },
              {
                "internalType": "uint8",
                "name": "ratingCount",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "listModel",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
              }
            ],
            "name": "purchaseModel",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
              },
              {
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
              }
            ],
            "name": "rateModel",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "modelId",
                "type": "uint256"
              }
            ],
            "name": "getModelDetails",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "getModelsCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          }
    ];

    const address = '0x1E3D6B6C6475D612B20F9D0EcB31143BD147d49A';
    contract = new web3.eth.Contract(abi, address);
};

const fetchModels = async () => {
    const modelsListContainer = document.getElementById('models-list');
    modelsListContainer.innerHTML = '';  // Очищаем предыдущие модели

    // Получаем количество моделей
    const modelsCount = await contract.methods.getModelsCount().call();

    // Получаем список моделей
    for (let i = 0; i < modelsCount; i++) {
        try {
            const model = await contract.methods.models(i).call();  // Получаем модель по индексу
            const modelElement = document.createElement('div');
            modelElement.innerHTML = `
                <h3>${model.name}</h3>
                <p>${model.description}</p>
                <p>Price: ${web3.utils.fromWei(model.price, 'ether')} ETH</p>
                <p id="model-rating-${i}">Average Rating: ${model.ratingCount > 0 ? model.ratingSum / model.ratingCount : 0}</p>
                <select id="rating-${i}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button onclick="purchaseModel(${i})">Purchase</button>
                <button onclick="rateModel(${i})">Rate</button>
                <button onclick="getModelDetails(${i})">Details</button>
            `;
            modelsListContainer.appendChild(modelElement);
        } catch (error) {
            console.error(`Error fetching model at index ${i}:`, error);
        }
    }
};


const listModel = async () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const accounts = await web3.eth.getAccounts();
    try {
        const gasLimit = 500000; // Увеличьте это значение при необходимости
        await contract.methods.listModel(name, description, web3.utils.toWei(price, 'ether'))
            .send({ from: accounts[0], gas: gasLimit });
        alert('Model listed successfully!');
        fetchModels();  // Refresh the models list
    } catch (error) {
        console.error('Error listing model:', error);
        alert('Failed to list model. See console for details.');
    }
};

const purchaseModel = async (modelId) => {
    // Проверка, подключен ли MetaMask
    if (typeof window.ethereum !== 'undefined') {
        // Запрашиваем доступ к учетным записям MetaMask
        await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('MetaMask is not installed.');
        return;
    }

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
        alert("Please connect MetaMask.");
        return;
    }

    try {
        // Получаем информацию о модели
        const model = await contract.methods.models(modelId).call();
        console.log('Model Price (in wei):', model.price);

        // Получаем цену модели из контракта в Wei
        const modelPriceInWei = model.price; // Цена уже в Wei

        // Проверяем баланс пользователя
        const balance = await web3.eth.getBalance(accounts[0]);
        console.log('User balance (in wei):', balance);
        if (Number(balance) < Number(modelPriceInWei)) {
            alert('Insufficient funds.');
            return;
        }

        // Оценка газа для транзакции
        const gasEstimate = await contract.methods.purchaseModel(modelId)
            .estimateGas({ from: accounts[0], value: modelPriceInWei });
        console.log('Gas estimate:', gasEstimate);

        // Отправка транзакции через MetaMask
        const transaction = await contract.methods.purchaseModel(modelId).send({
            from: accounts[0],
            value: modelPriceInWei, // Сумма в Wei
            gas: gasEstimate
        });

        console.log('Transaction successful:', transaction);
        alert('Model purchased successfully!');

    } catch (error) {
        console.error('Error purchasing model:', error);
        alert('Failed to purchase model. See console for details.');
    }
};



const rateModel = async (modelId) => {
    // Проверка, подключен ли MetaMask
    if (typeof window.ethereum !== 'undefined') {
        // Запрашиваем доступ к учетным записям MetaMask
        await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('MetaMask is not installed.');
        return;
    }

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
        alert("Please connect MetaMask.");
        return;
    }

    // Получаем рейтинг, выбранный пользователем
    const rating = parseInt(document.getElementById(`rating-${modelId}`).value);

    if (rating < 1 || rating > 5) {
        alert('Please select a rating between 1 and 5.');
        return;
    }

    try {
        const gasLimit = 500000;
        const gasEstimate = await contract.methods.rateModel(modelId, rating)
            .estimateGas({ from: accounts[0] });
        console.log('Gas estimate:', gasEstimate);

        // Отправка транзакции через MetaMask
        const transaction = await contract.methods.rateModel(modelId, rating).send({
            from: accounts[0],
            gas: gasEstimate || gasLimit // Используем оценку газа или лимит по умолчанию
        });

        console.log('Rating submitted successfully:', transaction);
        alert('Rating submitted successfully!');

        // Обновляем средний рейтинг модели на странице
        updateModelRating(modelId);
    } catch (error) {
        console.error('Error rating model:', error);
        alert('Failed to rate model. See console for details.');
    }
};

const updateModelRating = async (modelId) => {
    try {
        const modelDetails = await contract.methods.getModelDetails(modelId).call();
        const averageRating = modelDetails[4];  // Получаем средний рейтинг
        document.getElementById(`model-rating-${modelId}`).innerText = `Average Rating: ${averageRating}`;
    } catch (error) {
        console.error('Error fetching model details:', error);
    }
};


const withdrawFunds = async () => {
    if (typeof window.ethereum !== 'undefined') {
        await ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('MetaMask is not installed.');
        return;
    }

    const accounts = await web3.eth.getAccounts();

    if (accounts.length === 0) {
        alert("Please connect MetaMask.");
        return;
    }

    try {
        // Ensure contract has an owner() method
        const contractOwner = await contract.methods.owner().call();
        console.log('Contract owner address:', contractOwner);

        if (accounts[0] !== contractOwner) {
            alert('Only the contract owner can withdraw funds.');
            return;
        }

        const gasEstimate = await contract.methods.withdrawFunds()
            .estimateGas({ from: accounts[0] });
        console.log('Gas estimate:', gasEstimate);

        const transaction = await contract.methods.withdrawFunds().send({
            from: accounts[0],
            gas: gasEstimate || 500000
        });

        console.log('Funds withdrawn successfully:', transaction);
        alert('Funds withdrawn successfully!');
    } catch (error) {
        console.error('Error withdrawing funds:', error);
        alert('Failed to withdraw funds. See console for details.');
    }
};



const getModelDetails = async (modelId) => {
    const modelDetails = await contract.methods.getModelDetails(modelId).call();

    const name = modelDetails[0];
    const description = modelDetails[1];
    const price = web3.utils.fromWei(modelDetails[2], 'ether');
    const creator = modelDetails[3];
    const averageRating = modelDetails[4];

    console.log('Model Details:', { name, description, price, creator, averageRating });
};

// Функция для отображения деталей модели
// Функция для отображения деталей модели
const viewModelDetails = async (modelId) => {
    try {
        // Вызов функции контракта для получения деталей модели
        const modelDetails = await contract.methods.getModelDetails(modelId).call();

        // Извлечение данных из полученного объекта
        const name = modelDetails[0];
        const description = modelDetails[1];
        const price = web3.utils.fromWei(modelDetails[2], 'ether'); // Преобразование из wei в ether
        const creator = modelDetails[3];
        const averageRating = modelDetails[4];

        // Логирование деталей в консоль
        console.log('Model Details:', { name, description, price, creator, averageRating });

        // Отображение информации на странице (в элементе с id "modelDetails")
        const detailsSection = document.getElementById('modelDetails');
        detailsSection.innerHTML = `
            <h3>Model Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Price:</strong> ${price} ETH</p>
            <p><strong>Creator:</strong> ${creator}</p>
            <p><strong>Average Rating:</strong> ${averageRating}</p>
        `;
    } catch (error) {
        console.error('Error getting model details:', error);
    }
};



// Call fetchModels on page load to display the models initially
window.onload = async () => {
    await init();  // Initialize the contract and web3
    fetchModels();  // Display the models when the page loads
};
