// This file is used only in builds.
// jshint esversion: 6
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 9000;
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('environment', environment);
app.set('port', port);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

app.get('*', function(request, resolve) {
  const fileType = path.extname(request.url);
  let filePath;

  if (fileType) {
    filePath = __dirname + '/public' + path.resolve(request.url);
    fs.readFile(filePath, function(error, content) {
      if (error) {
        resolve.render('index.html');
      } else {
        resolve.sendfile(content);
      }
    });
  } else {
    resolve.render('index.html');
  }
});

http.createServer(app).listen(port, function() {
  if (environment === 'development') {
    console.log('Running on http://localhost:' + port);
  } else {
    console.log('Listening on port ' + port);
  }
});
