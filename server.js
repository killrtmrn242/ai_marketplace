const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
