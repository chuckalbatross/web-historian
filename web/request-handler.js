var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var querystring = require('querystring');
var httpHelpers = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  // var callbackTest = (res) => {
  //   httpHelpers.serveAssets
  // };
  // archive.isUrlArchived('www.example.com', res, (stats) => {
  //   res.end(stats);
  // });

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

      
      // post (www.example.com)

      // archive.isurlthere (post, funciton(boolean) {
          // if boolean is true
            // checkArchives(post)
          // if boolean is false
            // addtoURL(post)
      // })
      // set fileUrl based on post
        // if post contained in sites.txt
          // set fileUrl to archived site (index.html)
      
      fileUrl = archive.paths.siteAssets + '/loading.html';

      httpHelpers.serveAssets(res, fileUrl, (data) => {
        res.end(data);
      });

    });
  }


};












