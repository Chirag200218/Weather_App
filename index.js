const api = "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=5f18030ff8e218b95e7a300ba012593a";
const http = require('http');
const fs = require('fs');
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");
replaceVal =(tempVal , orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp/10);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min/10);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max/10);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    return temperature;

}
const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=5f18030ff8e218b95e7a300ba012593a')
            .on('data', (chunk)=> {
                const objData = JSON.parse(chunk);
                const arrData = [objData];

                console.log(arrData);
                const realTimeData = arrData.map((val)=>replaceVal(homeFile,val)).join(" ");
                res.write(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
})
server.listen(8000);