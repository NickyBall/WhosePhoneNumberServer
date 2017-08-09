'use strict';

var url = require('url');


var Comments = require('./CommentsService');


module.exports.searchComment = function searchComment (req, res, next) {
  Comments.searchComment(req.swagger.params, res, next);
};
