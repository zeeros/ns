'use strict';

var PORT = 5000

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var app = express();
var tls = require('tls');

var fs = require('fs');
var secretKey = fs.readFileSync('.recaptcha.key', 'utf8').replace(/(\r\n|\n|\r)/gm, "");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/access.html');
});

app.post('/submit', function(req, res) {
    // Captcha is not selected
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.status(401).send("<p>Captcha is not selected</p>");
    }

    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            return res.status(401).send("<p>Failed captcha verification</p>");
        }
        res.sendFile(__dirname + '/protected.html');
    });

});

app.use("*", function(req, res) {
    res.status(404).send('<p>Page not found</p>');
})

app.listen(PORT);
