const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// replace with your own token
const token = '6030634387:AAHltR_FhYF-06J6C9H62s9Oiymf8qooVUg';
const bot = new TelegramBot(token, { polling: true });

// OpenWeatherMap API key
const openWeatherMapKey = 'dfc640679b79f9d7d77e90ea761e51e3';

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет, я телеграм-бот погоды. Чтобы узнать погоду просто напиши /weather город. Например: /weather Батуми');
});

// handle the /weather command
bot.onText(/\/weather/, (msg, match) => {
  const chatId = msg.chat.id;
  const location = match.input.split(' ')[1];

  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru&appid=${openWeatherMapKey}&units=metric`)
    .then((response) => {
      const weather = response.data.weather[0].description;
      const temp = response.data.main.temp.toFixed(0);
      const wind =  response.data.wind.speed;
      const humidity =  response.data.main.humidity;
      bot.sendMessage(chatId, `Погода в ${location} сейчас:  ${weather}. \nТемпература:  ${temp} °C \nСкорость ветра: ${wind} м/c.\nВлажность: ${humidity }%`);
    })
    .catch((error) => {
      bot.sendMessage(chatId, 'Извини, я не смог найти  город:(');
    });
});