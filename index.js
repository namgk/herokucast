var express = require('express'),
    // fs = require('fs'),
    app = express(),
    // https = require('https').createServer({key: fs.readFileSync('key.pem'),cert: fs.readFileSync('cert.pem')}, app),
    http = require('http').createServer(app);

app.set('port', (process.env.PORT || 9222));
// app.set('sport', (process.env.PORT || 443));
app.use(express.static(__dirname + '/public'));

app.get('/index', function(request, response) {
    response.send('Hi World');
});

// https.listen(app.get('sport'), function() {
//   console.log("Node app is running at :" + app.get('sport'));
// });

http.listen(app.get('port'), function() {
  console.log("Node app is running at :" + app.get('port'));
});
