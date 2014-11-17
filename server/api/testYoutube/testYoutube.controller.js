'use strict';

var _ = require('lodash');
var Testyoutube = require('./testYoutube.model');
var youtube = require('../googleYouTube/youtube');
var jobChannelCrawler = require('../googleYouTube/jobChannelCrawler');

exports.getChannelId = function(req, res) {
  youtube.getChannelInfo(req.params.id, false, function(err, answer) {
    if(err) { return handleError(res, err); }
    return res.json(200, answer);
  })
};

exports.startCrawler = function(req, res) {
  youtube.getChannelInfo(req.params.id, true, function(err, answer) {
    if(err) { return handleError(res, err); }

    jobChannelCrawler.enqueue('getChannel', answer, function (err, job) {
      console.log('enqueued:', job.data);
    });
  })
};

// Get list of testYoutubes
exports.index = function(req, res) {
  Testyoutube.find(function (err, testYoutubes) {
    if(err) { return handleError(res, err); }
    return res.json(200, testYoutubes);
  });
};

// Get a single testYoutube
exports.show = function(req, res) {
  Testyoutube.findById(req.params.id, function (err, testYoutube) {
    if(err) { return handleError(res, err); }
    if(!testYoutube) { return res.send(404); }
    return res.json(testYoutube);
  });
};

// Creates a new testYoutube in the DB.
exports.create = function(req, res) {
  Testyoutube.create(req.body, function(err, testYoutube) {
    if(err) { return handleError(res, err); }
    return res.json(201, testYoutube);
  });
};

// Updates an existing testYoutube in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Testyoutube.findById(req.params.id, function (err, testYoutube) {
    if (err) { return handleError(res, err); }
    if(!testYoutube) { return res.send(404); }
    var updated = _.merge(testYoutube, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, testYoutube);
    });
  });
};

// Deletes a testYoutube from the DB.
exports.destroy = function(req, res) {
  Testyoutube.findById(req.params.id, function (err, testYoutube) {
    if(err) { return handleError(res, err); }
    if(!testYoutube) { return res.send(404); }
    testYoutube.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
