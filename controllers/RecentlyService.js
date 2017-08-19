'use strict';

exports.getRecentlyCheckedPhoneNumber = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  var examples = {};
  examples['application/json'] = [ {
    "address" : "Atlanta, Georgia, United States",
    "phonenumber" : "404-275-4585",
    "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
  } ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

}

exports.getRecentlyComments = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  // var examples = {};
  // examples['application/json'] = [ {
  //   "date" : "2016-08-29T09:12:33.001Z",
  //   "phonenumber" : "404-275-4585",
  //   "comment" : "This is a debt collector",
  //   "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  //   "username" : "Widget Adapter"
  // } ];
  // if(Object.keys(examples).length > 0) {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  // }
  // else {
  //   res.end();
  // }
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      db.close();
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Comments');
      collection.find({}).sort({_id:-1}).limit(5).toArray( (err, result) => {
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          db.close();
          // var json = { "status" : "OK", "desc" : result };
          res.end(JSON.stringify(result));
        }
      });
    }

  });

}

exports.getReportSafe = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  //     var examples = {};
  //   examples['application/json'] = [ {
  //   "date" : "2016-08-29T09:12:33.001Z",
  //   "ipaddress" : "192.168.1.1",
  //   "phonenumber" : "850-586-6200",
  //   "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
  // } ];
  //   if(Object.keys(examples).length > 0) {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  //   }
  //   else {
  //     res.end();
  //   }

  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Votes');
      collection.find({"VoteId":"1"}).sort({_id:-1}).limit(5).toArray( (err, result) => {
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          db.close();
          // var json = { "status" : "OK", "desc" : result };
          res.end(JSON.stringify(result));
        }
      });
    }

  });

}

exports.getReportUnSafe = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  //     var examples = {};
  //   examples['application/json'] = [ {
  //   "date" : "2016-08-29T09:12:33.001Z",
  //   "ipaddress" : "192.168.1.1",
  //   "phonenumber" : "850-586-6200",
  //   "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
  // } ];
  //   if(Object.keys(examples).length > 0) {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  //   }
  //   else {
  //     res.end();
  //   }
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Votes');
      collection.find({"VoteId":"0"}).sort({_id:-1}).limit(5).toArray( (err, result) => {
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          db.close();
          // var json = { "status" : "OK", "desc" : result };
          res.end(JSON.stringify(result));
        }
      });
    }

  });
}
