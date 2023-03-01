const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const process = require('process');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res)=>{
    const quary = req.body.cityName;
    const apiKey = "76f777e9672c4f59b06e30abd87fe6c2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ quary +"&appid="+ apiKey +"&units="+ unit;

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDis = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p> The weater now is "+ weatherDis +"</p>");
            res.write("<h1>The Tampature is "+ quary +" "+temp+" Celcius</h1>");
            res.write("<img src="+ imageUrl +">");
            res.send();
        });
    });
})

    
app.listen(port, function (){
    console.log(`Server is running on port ${port}`);
})