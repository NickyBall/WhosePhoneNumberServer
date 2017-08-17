'use strict';

exports.getAllAreaCode = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "code" : "201",
  "state" : "New Jersey"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

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
    var examples = {};
  examples['application/json'] = [ {
  "country" : "United State",
  "carrier" : "VERIZON NEW YORK, INC.",
  "city" : "Jersey City",
  "usage_type" : "Landline",
  "prefix" : "349",
  "interformat" : "+1 718 349 9300",
  "county" : "Queens",
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "state" : "New Jersey",
  "areacode" : "718"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

}
