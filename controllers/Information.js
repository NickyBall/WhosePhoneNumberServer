'use strict';

var url = require('url');


var Information = require('./InformationService');


module.exports.getAllAreaCode = function getAllAreaCode (req, res, next) {
  Information.getAllAreaCode(req.swagger.params, res, next);
};

module.exports.getStateByAreaCode = function getStateByAreaCode (req, res, next) {
  Information.getStateByAreaCode(req.swagger.params, res, next);
};

module.exports.getPhoneDescription = function getPhoneDescription (req, res, next) {
  Information.getPhoneDescription(req.swagger.params, res, next);
};
