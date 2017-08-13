'use strict';

exports.addComment = function(args, res, next) {
  /**
   * parameters expected in the args:
  * commentBody (CommentBody)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "result" : "OK",
  "description" : "Description",
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

exports.searchComment = function(args, res, next) {
  /**
   * parameters expected in the args:
  * phoneNumber (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "date" : "2016-08-29T09:12:33.001Z",
  "ipaddress" : "192.168.1.1",
  "comment" : "This is a debt collector",
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "username" : "Widget Adapter"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

