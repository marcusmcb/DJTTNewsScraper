const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express()

app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.set(require('./routes/views')(app))
app.set(require('./routes/database')(app))

var PORT = process.env.PORT || 3000;
app.listen(PORT, _ => { console.log('http://localhost:3000') })