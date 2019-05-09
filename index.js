"use strict";

// запускаем сервер
const express = require("express");
const app = express();
const port = 5000;
app.listen(port);
console.log("Port: " + port);

// расдача статических файлов
app.use(express.static(__dirname + "/static"));

// добавление заголовков
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

// получение суммы чисел
app.get("/sum/find", function (request, response) {
    // получаем переменные запроса
    let a = request.query.a.toString();
    let b = request.query.b.toString();
    // получаем сумму
    let s = parseInt(a) + parseInt(b);
    // если сумма не является корректным числом
    if(s === null || s === undefined || isNaN(s) === true) {
        // генерируем ошибку
        throw new Error();
    }
    // выводим сообщение в консоль
    console.log("OK === " + "A: " + a + "  B: " + b + "  S: " + s);
    // возвращаем ответ
    response.end(s.toString());
});

// при возникновении ошибки
app.use(function (err, request, response, next) {
    // получаем переменные запроса
    let a = request.query.a;
    let b = request.query.b;
    // выводим сообщение об ошибке в консоль
    console.log("Error === " + "A: " + a + "  B: " + b);
    // возвращаем ответ
    response.end(JSON.stringify({
        a: a + "",
        b: b + "",
    }));
});

// если маршрут не найден
app.use(function (request, response) {
    // выводим сообщение в консоль
    console.log("Way not found === show 404 page");
    // выдаем страницу с сообщением 404
    response.sendFile(__dirname + "/static/notFound.html");
});

