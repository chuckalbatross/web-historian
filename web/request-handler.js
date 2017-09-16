var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var querystring = require('querystring');
var httpHelpers = require('./http-helpers');


exports.handleRequest = function (req, res) {

  var fileUrl;

  var urls = ['www.google.com', 'www.walmart.com', 'www.homedepot.com'];
  archive.downloadUrls(urls);

  // move to http helpers
  var callbackHelper = function(callbackFile) {
    httpHelpers.serveAssets(res, callbackFile, res.end(callbackFile));
  };

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

      archive.isUrlInList(post, (asset) => {
        callbackHelper(asset);
      })   

    });
  }
};












