Creating complete WeatherApp --> using EXPRESS, NODE, REALTIME API, HTML, CSS, JS

We will be Using hbs view engine. ---> Handlebars

for simplicity first create a static website, and then copy that layout to a template engine and delete previous one.
for template engine to be used , there must be "views" folder in the structure.


when we use template engine, in place of res.send , we use ---> res.render('<filename.hbs or just filename>'')

in app.js --->  we must mention ---> app.set('view engine', 'hbs');

use partials
---put repetitive code inside these and call in main files like ---> {{>header}}

--- also in main file app.js --> specify that u r using partials.


**********************************

API KEY : 00a81f2bee5fa98eb421638ae616ea1f
API URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=00a81f2bee5fa98eb421638ae616ea1f
Clear
Rain
Haze
Clouds

--------------------------------


    --------------------------------
    ------------------------------------

 