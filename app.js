const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.post('/', (req, res)=>{
    // console.log(req.body.cityName);
    // console.log(`post received`);
    const query = req.body.cityName;
    const apiKey = "fcb491548631fc6e25a1cab90b1a1839";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    https.get(url, response => {
        console.log(response.statusCode);
        response.on("data", data => {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const weatherImg = weatherData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${weatherImg}@2x.png`
            // res.send("<h1>The temperature in Paris is "+ temp+" degree-celsius</h1></br>The weather is currently "+desc);
            //JSON.stringify(data)
            res.write("<h1>The temperature in "+ query+" is "+ temp+" degree-celsius</h1>");
            res.write("<p>The weather is currently "+desc+"</p>");
            res.write("<img src="+imgUrl+"></img>");
            res.send();
        })
    })
    // res.send("Server is up and running.");
});



app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})