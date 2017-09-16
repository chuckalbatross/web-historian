var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers.js');
var request = require('request');

/////////////////////////////////////////////////////////////////////////////
// COMMON FILE PATHS
/////////////////////////////////////////////////////////////////////////////
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

/////////////////////////////////////////////////////////////////////////////
// ARCHIVE HELPER FUNCTIONS
/////////////////////////////////////////////////////////////////////////////
exports.readListOfUrls = function(callback) {  

  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      callback(`Error getting file: ${err}`);
    } else {
      var siteArray = data.toString().split('\n');
      // loop through site array
      for (var i = 0; i < siteArray.length; i++) {
        //if element === url        // was going to do (callback(element)) and pass url through callback as comparison, but callback needs to be callbackHelper => OR!!! callback could contain callback helper
        callback(siteArray[i], i === siteArray.length - 1);
      }
    }
  });
  
};

exports.isUrlInList = function(url, callback) {

  // callback = callbackHelper

  var urlInListCallback = (desiredUrl, currUrl, callback, bool) => {
    if (currUrl === desiredUrl) {
      exports.isUrlArchived(desiredUrl, callback);
    } else {
      if (bool) {
        exports.addUrlToList(desiredUrl, callback);
      }
    }

  };

  // exports.readListOfUrls( urlInListCallback(url, currUrl, callback) );      //when would it need to be an ES6 function that passes these in???
  // this gives currUrl is not defined
  exports.readListOfUrls( (currUrl, bool) => {
    urlInListCallback(url, currUrl, callback, bool) 
  }); 


  // DOESN'T WORK BC ASYNC (siteArray different at diff times)
  // var siteArray = [];
  // var generateSiteArr = (element) => {
  //   siteArray.push(element);
  // };
  // exports.readListOfUrls( (element) => {
  //   generateSiteArr(element);
  // });
  // console.log(siteArray);

};

exports.addUrlToList = function(url, callback) {
  console.log('add to list');
  // write url to list
  fs.appendFile(exports.paths.list, url.url + '\n', (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      var asset = exports.paths.siteAssets + '/loading.html';
      callback(asset);
    }
  });

  // callback on loading.html

};

//(res, url, data) => {
//  serveAssets(res, asset, stats)
//}

exports.isUrlArchived = function(url, callback) {
  var fileUrl = exports.paths.archivedSites + '/' + url;
  fs.stat(fileUrl, (err, stats) => {
    stats.filename = fileUrl;
    if (err) {
      //console.log(`Error: ${err}`);
      var asset = exports.paths.siteAssets + '/loading.html';
      callback(asset);
      // httpHelpers.serveAssets(res, asset, callback(stats) );
    } else {
      console.log(`Stats: ${stats}`); 
      // httpHelpers.serveAssets(res, stats.filename, callback(stats) );
    }
  });
  
};

exports.downloadUrls = function(urls) {

  // set User-Agent header key
  var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0';
  // list of urls we need to get
  var customHeaderRequest = request.defaults({
      headers: {'User-Agent': ua}
  });

  // iterate through urls
  for (var i = 0; i < urls.length; i++) {
    // build fullUrl to be fetched
    var fullUrl = 'http://' + urls[i];

    //call request variable
    customHeaderRequest(fullUrl, (error, response, body) => {
      // set fullUrl key to maintain access when building file path
      response.fullUrl = fullUrl;

      if (error) {
        console.log(error);
      } else {

        var asset = exports.paths.archivedSites + '/' + response.fullUrl.slice(7);
        fs.writeFile(asset, body, (err) => {
          if (err) {
            console.log(`Error: ${err}`);
          } else {
            console.log('File successfully written');
          }
        })
      }
    })
  }
};
