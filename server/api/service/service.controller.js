'use strict';

var _ = require('lodash');
var Service = require('./service.model');
var youtube = require('../googleYouTube/youtube');
var jobChannelCrawler = require('../googleYouTube/jobChannelCrawler');

exports.search = function(req, res) {
  var channelId = req.params.id;

  youtube.getChannelInfo(channelId, false, function(err, answer) {
    if(err) { return res.send(404, err); }
    return res.json(200, answer);
  })

};

exports.add = function(req, res) {
  var channelId = req.params.id;

  jobChannelCrawler.enqueue('getChannel', {channelId: channelId}, function (err, job) {
    console.log('enqueued:', channelId);
  });

  return res.json(200, 'done');
};

/*
// Get list of services
exports.index = function(req, res) {
  Service.find(function (err, services) {
    if(err) { return handleError(res, err); }
    return res.json(200, services);
  });
};

// Get a single service
exports.show = function(req, res) {
  Service.findById(req.params.id, function (err, service) {
    if(err) { return handleError(res, err); }
    if(!service) { return res.send(404); }
    return res.json(service);
  });
};

// Creates a new service in the DB.
exports.create = function(req, res) {
  Service.create(req.body, function(err, service) {
    if(err) { return handleError(res, err); }
    return res.json(201, service);
  });
};

// Updates an existing service in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Service.findById(req.params.id, function (err, service) {
    if (err) { return handleError(res, err); }
    if(!service) { return res.send(404); }
    var updated = _.merge(service, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, service);
    });
  });
};

// Deletes a service from the DB.
exports.destroy = function(req, res) {
  Service.findById(req.params.id, function (err, service) {
    if(err) { return handleError(res, err); }
    if(!service) { return res.send(404); }
    service.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
*/

function handleError(res, err) {
  return res.send(500, err);
}
