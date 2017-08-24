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

//     var examples = {};
//   examples['application/json'] = [ {
//   "result" : "OK",
//   "description" : "Description",
//   "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
// } ];
//   if(Object.keys(examples).length > 0) {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
//   }
//   else {
//     res.end();
//   }

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
  // console.log(args);
//     var examples = {};
//   examples['application/json'] = [ {
//   "result" : "OK",
//   "description" : "Description",
//   "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
// } ];
// // examples['application/json'] = [  ];
//   if(Object.keys(examples).length > 0) {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
//   }
//   else {
//     res.end();
//   }

}

exports.recentReport = function(args, res, next) {
  /**
   * parameters expected in the args:
  * phoneNumber (String)
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  var areaCode = args.PhoneNumber.value.substring(0,3);
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
