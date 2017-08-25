'use strict';

exports.getAllAreaCode = function(args, res, next) {
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
      var collection = db.collection('AreaCode');
      collection.find({}).toArray(function (err, result){
        if (err) {
          db.close();
          res.end(err);
        } else if (result.length) {
          db.close();
          res.end(JSON.stringify(result));
        }
      });
    }
  });
  //     var examples = {};
  //   examples['application/json'] = [ {
  //   "code" : "201",
  //   "state" : "New Jersey"
  // } ];
  //   if(Object.keys(examples).length > 0) {
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  //   }
  //   else {
  //     res.end();
  //   }

}

exports.getStateByAreaCode = function(args, res, next) {
  /**
  * parameters expected in the args:
  * us_code (String)
  **/
  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';
  console.log(args.AreaCode.value);
  mongoClient.connect(url, function(err, db){
    if (err) {
      db.close();
      console.log('Unable to Connect Server.');
    } else {
      console.log('Connect Establish.');
      var collection = db.collection('AreaCode');
      collection.findOne({"code":args.AreaCode.value}, function (err, result){
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

exports.getPhoneDescription = function(args, res, next) {
  /**
  * parameters expected in the args:
  * phonenumber (String)
  **/
  console.log(args);
  var phonenumber = args.phonenumber.value;
  var isLog = false;
  if (args.log) {
    if (args.log.value == "true") {
      isLog = true;
    }
  }
  var country_code = 'US';
  var format = '1';
  var key = 'b8181f19a13dab009d378af83f20b019';

  var mongo = require('mongodb');
  var mongoClient = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/wpn';

  mongoClient.connect(url, function(err, db){
    if (err) {
      var json = { "status" : "ERROR", "desc" : 'Unable to Connect Server.' };
      db.close();
      res.end(JSON.stringify(json));
    } else {
      var collection = db.collection('PhoneInfo');
      // Find phonenumber
      collection.findOne({"local_format":phonenumber.replace("-","")}, (err, result) => {
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          // No error.
          if (result) {
            // Has result => use it.

            // If want to log.
            if (isLog) {
              if (!phonenumber.includes("-")) phonenumber = phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // Add dash(-)
              var collection = db.collection('Checked');
              collection.insertOne({"PhoneNumber": phonenumber, "location": result.location});
            }

            // Close connection.
            db.close();
            // hangup from client.
            res.end(JSON.stringify(result));
          } else {
            // No result get from Numverify API and store.
            var request = require('request'); // Library for call rest API with Nodejs.
            request('http://apilayer.net/api/validate?access_key='+key+'&number='+phonenumber.replace("-","")
            + '&country_code='+country_code+'&format='+format, (error, response, body) => {
              if (error) {
                db.close();
                var json = { "status" : "ERROR", "desc" : err };
                res.end(JSON.stringify(json));
              } else {
                var resJson = JSON.parse(body);

                var collection = db.collection('PhoneInfo');
                collection.insertOne(resJson, function (err, result){
                  if (err) {
                    db.close();
                    var json = { "status" : "ERROR", "desc" : err };
                    res.end(JSON.stringify(json));
                  } else {
                    // If want to log.
                    if (isLog) {
                      if (!phonenumber.includes("-")) phonenumber = phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                      var collection = db.collection('Checked');
                      collection.insertOne({"PhoneNumber": phonenumber, "location": resJson.location});
                    }
                    // Close connection.
                    db.close();
                    // Hangup from client.
                    res.end(JSON.stringify(resJson));
                  }
                });
              }
            });
          }
        }
      });
    }
  });





}
