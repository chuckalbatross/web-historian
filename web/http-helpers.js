var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt',
  '.gif': 'image/gif'
};

exports.serveAssets = function(res, asset, callback) {
  // 
  var headers = exports.headers;
  var statusCode = 200;
  var ext = path.parse(asset).ext;
  headers['Content-Type'] = mimeType[ext];
  res.writeHead(statusCode, headers);


  fs.readFile(asset, (err, data) => {
    if (err) {
      console.log(`Error getting file: ${err}`);
      callback('');
    } else {
      if (typeof callback === 'function') {
        callback(data);
      }
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
