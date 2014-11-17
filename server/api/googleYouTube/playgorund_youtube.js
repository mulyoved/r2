'use strict';
var run_getChannelInfo = false;
var run_queuTest = false;
var run_crawler = true;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var config = require('../../config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var channelId = 'UClEQqLc5V_j1wg1Ro8Hcrow';


if (run_getChannelInfo) {
  var youtube = require('./youtube');
  youtube.getChannelInfo(channelId, false, function (err, answer) {
    if (err) {
      console.log('Error', err);
    }
    else {
      console.log('Answer', answer);
    }
  });
}

if (run_queuTest) {
  var jobChannelCrawler = require('./jobChannelCrawler');
  jobChannelCrawler.enqueue('getChannel', { text: 'foobar' }, function (err, job) {
    console.log('enqueued:', job.data);
  });
}

if (run_crawler) {
  var youtube = require('./youtube');
  var jobChannelCrawler = require('./jobChannelCrawler');
  youtube.getChannelInfo(channelId, true, function(err, answer) {
    if (err) {
        console.log('Error', err);
      }
      else {

      console.log('Retrived channel info', answer.channelId);
      var arrayLength = answer._doc.featuredChannels.length;
      for (var i = 0; i < arrayLength; i++) {
        var channelId = answer._doc.featuredChannels[i];
        console.log('enqueued:', channelId);
        jobChannelCrawler.enqueue('getChannel', { channelId: channelId }, function (err, job) {
        });
      }
    }
  });
}
