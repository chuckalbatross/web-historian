var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var querystring = require('querystring');
var httpHelpers = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  var fileUrl;

  if (req.method === 'GET') {

    // make fileUrl for root index.html
    if (req.url === '/') {
      fileUrl = archive.paths.siteAssets + '/index.html';

    } else {
      fileUrl = archive.paths.siteAssets + req.url;

    }

    httpHelpers.serveAssets(res, fileUrl, (data) => {
      res.end(data);
    });
  }
    
  if (req.method === 'POST') {
    var body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      var post = querystring.parse(body);
      
      fileUrl = archive.paths.siteAssets + '/loading.html';

      httpHelpers.serveAssets(res, fileUrl, (data) => {
        res.end(data);
      });

    });
  }







};
