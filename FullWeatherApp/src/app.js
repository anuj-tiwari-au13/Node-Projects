const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8008;

//if root has views folder that only this much code is enough for template engine.
// here as views is not in root but inside template, so we have to tell express that where our views folder lies.

app.set('view engine', 'hbs');
//specifying new views folder path below
app.set('views', path.join(__dirname, '../template/views'));

//register the partials below
hbs.registerPartials(path.join(__dirname, '../template/partials'));

//below line of code
//express.static is a built in middleware, to load staic web pages.
// __dirname by default points to src folder.
// by join method, we will make it point to public filder, so that index.html can be loaded.

// specifying use of static website with files in public folder, which are later moved to template engine and deleted.
app.use(express.static(path.join(__dirname, '../public')));


//Routing
// note- root route ko '/' ya '' se show kar sakte hain.
// here we have used '/'
app.get('/', (req, res) => {
    res.render("index.hbs");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/weather', (req, res) => {
    res.render("weather");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});

app.get('*', (req, res) => {
    res.render("error404");
});



//server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);

});