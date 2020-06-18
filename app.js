const express = require('express');
const https = require('https');
const app = express();


app.get('/', (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=fcb491548631fc6e25a1cab90b1a1839&units=metric&precipitation=min"
    https.get(url, response => {
        console.log(response.statusCode);
        response.on("data", data => {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            console.log(desc);
            //JSON.stringify(data)
        })
    })
    res.send("Server is up and running.");
})



app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})