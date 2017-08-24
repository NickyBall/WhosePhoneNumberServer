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

exports.getAreaCodeDescription = function(args, res, next) {
  /**
   * parameters expected in the args:
  * us_code (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "country" : "United State",
  "city" : "Jersey City",
  "timezone" : "Eastern (UTC-05:00)",
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "state" : "New Jersey",
  "current_time" : "04:48 am"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

}

exports.getPhoneDescription = function(args, res, next) {
  /**
   * parameters expected in the args:
  * phonenumber (String)
  **/
  var phonenumber = args.phonenumber.value;
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
      console.log(phonenumber.replace("-",""));
      var collection = db.collection('PhoneInfo');
      collection.findOne({"local_format":phonenumber.replace("-","")}, (err, result) => {
        if (err) {
          db.close();
          var json = { "status" : "ERROR", "desc" : err };
          res.end(JSON.stringify(json));
        } else {
          if (result) {
            if (!phonenumber.includes("-")) phonenumber = phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            var collection = db.collection('Checked');
            collection.insertOne({"PhoneNumber": phonenumber, "location": result.location});
            db.close();
            // var json = { "status" : "OK", "desc" : result };
            res.end(JSON.stringify(result));
          } else {
            var request = require('request');
            request('http://apilayer.net/api/validate?access_key='+key+'&number='+phonenumber.replace("-","")
            + '&country_code='+country_code+'&format='+format, (error, response, body) => {
                // console.log(res);
                // console.log(body);
                var resJson = JSON.parse(body);
                var collection = db.collection('PhoneInfo');
                collection.insertOne(resJson, function (err, result){
                  if (err) {
                    db.close();
                    var json = { "status" : "ERROR", "desc" : err };
                    res.end(JSON.stringify(json));
                  } else {
                    if (!phonenumber.includes("-")) phonenumber = phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
                    var collection = db.collection('Checked');
                    collection.insertOne({"PhoneNumber": phonenumber, "location": resJson.location});
                    db.close();
                    var json = { "status" : "OK", "desc" : result };
                    res.end(JSON.stringify(resJson));
                  }
                });
            });
              // fetch('http://apilayer.net/api/validate?access_key=b8181f19a13dab009d378af83f20b019&number=4158586273&country_code=US&format=1').then(
              //   response => response.json()
              // ).then(response => {
              //
              // })

          }

        }
      });
    }

  });





}
