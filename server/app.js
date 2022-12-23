var express = require('express');
var fs = require('fs');
var path = require('path');
let cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
let router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors())
app.use(router)

app.listen(80, ()=>{
    console.log('Server started')
})