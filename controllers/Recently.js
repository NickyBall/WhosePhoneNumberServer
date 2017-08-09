'use strict';

var url = require('url');


var Recently = require('./RecentlyService');


module.exports.getRecentlyCheckedPhoneNumber = function getRecentlyCheckedPhoneNumber (req, res, next) {
  Recently.getRecentlyCheckedPhoneNumber(req.swagger.params, res, next);
};

module.exports.getRecentlyComments = function getRecentlyComments (req, res, next) {
  Recently.getRecentlyComments(req.swagger.params, res, next);
};

module.exports.getReportSafe = function getReportSafe (req, res, next) {
  Recently.getReportSafe(req.swagger.params, res, next);
};

module.exports.getReportUnSafe = function getReportUnSafe (req, res, next) {
  Recently.getReportUnSafe(req.swagger.params, res, next);
};
