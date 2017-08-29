'use strict';

exports.addComment = function(args, res, next) {
  /**
  * parameters expected in the args:
  * commentBody (CommentBody)
  **/
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
      collection.insertOne(args.CommentBody.value, function (err, result){
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          db.close();
          var json = { "status" : "OK", "desc" : result };
          res.end(JSON.stringify(json));
        }
      });
    }
  });
}

exports.postVote = function(args, res, next) {
  /**
  * parameters expected in the args:
  * commentBody (VoteBody)
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      var json = { "status":"ERROR", "desc":'Unable to Connect Server.' };
      db.close();
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Votes');
      collection.insertOne(args.VoteBody.value, function (err, result){
        if (err) {
          var json = { "status":"ERROR", "desc":err };
          db.close();
          res.end(JSON.stringify(json));
        } else {
          var json = { "status":"OK", "desc":result };
          db.close();
          res.end(JSON.stringify(json));
        }
      });
    }
  });
}

exports.recentReportByAreaCode = function(args, res, next) {
  /**
  * parameters expected in the args:
  * phoneNumber (String)
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  var areaCode = args.AreaCode.value;
  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Votes');
      collection.find({"PhoneNumber": new RegExp('^' + areaCode)}).sort({_id:-1}).limit(10).toArray( (err, result) => {
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

exports.getCommentByPhoneNumber = function(args, res, next) {

  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  var PhoneNumber = args.PhoneNumber.value;

  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Comments');
      collection.aggregate([
        {
          $lookup:
          {
            from: "CallerTypes",
            localField: "CallerTypeId",
            foreignField: "code",
            as: "CallerType"
          }
        }
      ]).sort({_id:-1}).limit(10).toArray( (err, result) => {
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

exports.recentReportByPhoneNumber = function(args, res, next) {
  /**
  * parameters expected in the args:
  * phoneNumber (String)
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  var PhoneNumber = args.PhoneNumber.value;
  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('Votes');
      collection.find({"PhoneNumber": PhoneNumber}).sort({_id:-1}).limit(10).toArray( (err, result) => {
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

exports.getAllCallerType = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      console.log('Unable to Connect Server.');
    } else {
      console.log('Connect Establish.');
      var collection = db.collection('CallerTypes');
      collection.find({}).toArray(function (err, result){
        if (err) {
          db.close();
          res.end(err);
        } else {
          db.close();
          res.end(JSON.stringify(result));
        }
      });
    }
  });
}

exports.voteCount = function(args, res, next) {
  /**
  * parameters expected in the args:
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      console.log('Unable to Connect Server.');
    } else {
      console.log('Connect Establish.');
      var collection = db.collection('Votes');
      var safe = -1;
      var unsafe = -1;
      collection.find({"VoteId":"0", "PhoneNumber":args.PhoneNumber.value}).toArray(function (err, result){
        if (err) {
        }
        unsafe = result.length;
        collection.find({"VoteId":"1", "PhoneNumber":args.PhoneNumber.value}).toArray(function (err, result){
          if (err) {
          }
          safe = result.length;


          db.close();
          res.end(JSON.stringify({
            safe: safe,
            unsafe: unsafe
          }))
        });

      });


    }
  });
}
