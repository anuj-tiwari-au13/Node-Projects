const http = require('http');
const fs = require('fs');

const requests = require('requests')
const homeFile = fs.readFileSync('home.html', 'utf-8');


// *********************************************


const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace(" {%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace(" {%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace(" {%location%}", orgVal.name);
    temperature = temperature.replace(" {%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

    
    return temperature;

    
}







//create server

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=00a81f2bee5fa98eb421638ae616ea1f")
            .on('data', (chunk) => {

                // we parsed JSON data to object
                const objData = JSON.parse(chunk);
                replaceVal(homeFile, objData);

                // Cnnverting Obj to array, creating array of object
                const arrData = [objData];

                const realTimeData = arrData
                    .map((val) => replaceVal(homeFile, val)).join("");

                res.write(realTimeData);


                // console.log(realTimeData);
            })
            // data is the event to read data from the given source.
            // end is also an event, to show data has been fully read.
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);

                res.end();

            });

    }

});

server.listen(8000, '127.0.0.1');