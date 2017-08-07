'use strict';

var url = require('url');


var Comments = require('./CommentsService');


module.exports.searchInventory = function searchInventory (req, res, next) {
  Comments.searchInventory(req.swagger.params, res, next);
};
