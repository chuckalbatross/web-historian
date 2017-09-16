var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    console.log(typeof(data));
    if (err) {
      callback(`Error getting file: ${err}`);
    } else {
      var siteArray = data.toString().split('\n');
      callback(siteArray);
    }
  });
  
};

exports.isUrlInList = function(url, callback) {
  //readListOfUrls (callback is _.contains)

  // read sites.txt
    // if err
      // addUrlToList

    // else (url is in sites.txt)
      // isURLArchived(true)

// renderAsset
};

exports.addUrlToList = function(url, callback) {

  

};

//(res, url, data) => {
//  serveAssets(res, asset, stats)
//}

exports.isUrlArchived = function(url, res, callback) {
  var fileUrl = exports.paths.archivedSites + '/' + url;
  fs.stat(fileUrl, (err, stats) => {
    stats.filename = fileUrl;
    if (err) {
      //console.log(`Error: ${err}`);
      var asset = exports.paths.siteAssets + '/loading.html';
      // httpHelpers.serveAssets(res, asset, callback(stats) );
    } else {
      console.log(`Stats: ${stats}`); 
      // httpHelpers.serveAssets(res, stats.filename, callback(stats) );
    }
  });
  
};

exports.downloadUrls = function(urls) {

};
