const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors()); // Разрешаем запросы с любых сайтов
app.use(express.json()); // Позволяем серверу читать JSON

// Главный адрес вашего прокси
app.post('/api/tasks', async (req, res) => {
    try {
        // Берем ключ из скрытой переменной (настроим позже)
        const webhookUrl = process.env.WEBHOOK_URL; 
        
        const response = await fetch(webhookUrl + 'tasks.task.list.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) // Пересылаем то, что прислал фронтенд
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));