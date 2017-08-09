'use strict';

exports.searchComment = function(args, res, next) {
  /**
   * parameters expected in the args:
  * phoneNumber (String)
  **/
    var examples = {};
    var items = [];
    for (var i = 0; i < 5; i++) {
      items.push(
        {
        "date" : "2016-08-29T09:12:33.001Z",
        "ipaddress" : "192.168.1.1",
        "comment" : "This is a debt collector",
        "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "username" : "Widget Adapter"
      }
      );
    }
  examples['application/json'] = items;
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }

}
