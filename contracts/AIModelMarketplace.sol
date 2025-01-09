// Обновленный смарт-контракт с логикой для вычисления среднего рейтинга
pragma solidity ^0.8.0;

contract AIModelMarketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address creator;
        uint8 ratingSum;
        uint8 ratingCount;
    }

    Model[] public models;
    mapping(uint256 => address) public modelPurchasers;

    // Функция для листинга модели
    function listModel(string memory name, string memory description, uint256 price) public {
        models.push(Model(name, description, price, msg.sender, 0, 0));
    }

    // Функция для покупки модели
    function purchaseModel(uint256 modelId) public payable {
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect payment");
        modelPurchasers[modelId] = msg.sender;
        payable(model.creator).transfer(msg.value);
    }

    // Функция для оценки модели
    function rateModel(uint256 modelId, uint8 rating) public {
        require(modelPurchasers[modelId] == msg.sender, "Not purchased");
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");

        Model storage model = models[modelId];
        model.ratingSum += rating;
        model.ratingCount += 1;
    }

    // Функция для получения подробной информации о модели, включая средний рейтинг
    function getModelDetails(uint256 modelId) public view returns (string memory, string memory, uint256, address, uint8) {
        Model storage model = models[modelId];
        uint8 averageRating = model.ratingCount > 0 ? model.ratingSum / model.ratingCount : 0;
        return (model.name, model.description, model.price, model.creator, averageRating);
    }
    
    // Функция для получения количества моделей
    function getModelsCount() public view returns (uint256) {
        return models.length;
    }
}
