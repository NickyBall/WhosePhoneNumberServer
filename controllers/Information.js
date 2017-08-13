'use strict';

var url = require('url');


var Information = require('./InformationService');


module.exports.getAreaCodeDescription = function getAreaCodeDescription (req, res, next) {
  Information.getAreaCodeDescription(req.swagger.params, res, next);
};

module.exports.getPhoneDescription = function getPhoneDescription (req, res, next) {
  Information.getPhoneDescription(req.swagger.params, res, next);
};
