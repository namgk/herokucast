var mongoRead = require('./mongoout')('mongodb://localhost:27017/cpen400')
var express = require('express')
var bodyParser = require('body-parser');
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mongoRead.initDb();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/products', function(request, response) {
  var token = request.query.token;

  mongoRead.validate(token, function(success){
    if (!success)
      response.status(401).send();
    else {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
      mongoRead.getAll(mongoRead.PRODUCTS, function(products){
        if (!products)
          response.status(502).send();
        else
          response.json(products);
      })
    }
  })
})

app.post('/checkout', function(request, response) {
  // console.log(response.data)
  var token = request.body.token;

  mongoRead.validate(token, function(success){
    if (!success)
      response.status(401).send();
    else {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      var cartTotal = request.body.total
      var cartString = request.body.cart

      mongoRead.addOrder(cartString, cartTotal);
      var dec = mongoRead.decrementCount(cartString)
      response.send('DONE');
    }
  })
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
