'use strict';

var url = require('url');


var Comments = require('./CommentsService');


module.exports.addComment = function addComment (req, res, next) {
  Comments.addComment(req.swagger.params, res, next);
};

module.exports.postVote = function postVote (req, res, next) {
  Comments.postVote(req.swagger.params, res, next);
};

module.exports.recentReport = function recentReport (req, res, next) {
  Comments.recentReport(req.swagger.params, res, next);
};

module.exports.getAllCallerType = function getAllCallerType (req, res, next) {
  Comments.getAllCallerType(req.swagger.params, res, next);
};

module.exports.voteCount = function voteCount (req, res, next) {
  Comments.voteCount(req.swagger.params, res, next);
};
