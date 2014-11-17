'use strict';

var _ = require('lodash');
var Channel = require('./channel.model');
var mongoosePaginate = require('mongoose-paginate');

// Get list of channels
exports.index = function(req, res) {
  var query = {};
  var searchText = req.query.searchText;
  if (searchText) {
    var re = new RegExp(searchText, 'i');
    /*
    query = {
      $or: [
        {title: { $regex: re}},
        {description: { $regex: re}},
        {brand_title: { $regex: re}},
        {brand_keywords: { $regex: re}},
        //{_id: new ObjectId(searchText)},
        {channelId: searchText},
      ]


    };
     */
    query = { $text: { $search: searchText }};
  }

  console.log('Get list of channels', req.query.page, req.query.limit, req.query.searchText, query);

  Channel.paginate(query, req.query.page, req.query.limit, function (err, pageCount, paginatedResults, itemCount) {
    if(err) {
      console.error(err);
      return handleError(res, err);
    }
    return res.json(200, paginatedResults);
  });
};

// Get a single channel
exports.show = function(req, res) {
  Channel.findById(req.params.id, function (err, channel) {
    if(err) { return handleError(res, err); }
    if(!channel) { return res.send(404); }
    return res.json(channel);
  });
};

exports.getByChannelId = function(req, res) {
  var channelId = req.params.id;
  Channel.find({channelId: channelId}, function (err, channel) {
    if(err) { return handleError(res, err); }
    if(!channel || channel.length == 0) { return res.send(404); }
    return res.json(channel[0]);
  });
};

// Creates a new channel in the DB.
exports.create = function(req, res) {
  Channel.create(req.body, function(err, channel) {
    if(err) { return handleError(res, err); }
    return res.json(201, channel);
  });
};

// Updates an existing channel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Channel.findById(req.params.id, function (err, channel) {
    if (err) { return handleError(res, err); }
    if(!channel) { return res.send(404); }
    var updated = _.merge(channel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, channel);
    });
  });
};

// Deletes a channel from the DB.
exports.destroy = function(req, res) {
  Channel.findById(req.params.id, function (err, channel) {
    if(err) { return handleError(res, err); }
    if(!channel) { return res.send(404); }
    channel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
