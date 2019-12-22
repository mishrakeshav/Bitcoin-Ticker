//starter code
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000,function(req,res){
    console.log("Server started on port 3000"); 
});

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    crypto = req.body.crypto;
    fiat = req.body.fiat;
    amount = req.body.amount;
    var options = {
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs : {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
   request( options, function(error,response,body){

        var data = JSON.parse(body);

        var price = data.price;
        var curDate = data.time;
        res.write("<p>" + "The current date is " + curDate + "</p>");
        res.write("<h1>" + amount + crypto + " is worth " +  price + fiat +"</h1>");
   });
});
