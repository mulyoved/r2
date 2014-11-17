var client = require('../../config/queue');
var Channel = require('../channel/channel.model');

//Crawler Queue
var queue_name = 'crawler_channel';
var queue = client.queue(queue_name);

var worker = client.worker([queue_name]);
var youtube = require('./youtube');

var getChannelInfo = function(params) {
  var channelId = params.channelId;
  youtube.getChannelInfo(channelId, true, function (err, answer) {
    if (err) {
      console.log('Error', err);
      //callback(err);
    }
    else {
      console.log('Channel Saved', answer._doc.channelId);
      var arrayLength = answer._doc.featuredChannels.length;
      for (var i = 0; i < arrayLength; i++) {
        var channelId = answer._doc.featuredChannels[i];
        console.log('Enqueue channel', channelId);
        queue.enqueue('getChannel', {channelId: channelId}, function (err, job) {
          //console.log('enqueued:', channelId);
        });
      }

      console.log('Finsihed Enqueue all channels');
      //callback(null, answer);
      console.log('Callback');
    }
  });
};

worker.register({
  getChannel: function (params, callback) {
    try {
      var channelId = params.channelId;
      console.log('Crawler: Job Channel', channelId);

      Channel.find({ channelId: channelId}, function (err, cannel) {
        if (err) {
          console.log('Error failed to get channel', channelId);
          //callback(err);
        }
        else if(!cannel || cannel.length==0 ) {
          setTimeout(function() {
            console.log('Crawler: Channel not found', channelId);
            getChannelInfo(params);
            console.log('Crawler: Fished crawl channel', channelId);
          }, 10);
          //callback(null, params);
        }
        else {
          console.log('Channel already retrieved', channelId);
          //callback(null, cannel);
          //console.log('After callback');
        }
      });
      callback(null, params);
    } catch (err) {
      console.log('Error',err);
      callback(err);
    }
  }
});

//worker.on('dequeued', function (data) { console.log('dequeued… ', data); });
//worker.on('failed', function (data) { console.log('failed… ', data); });
//worker.on('complete', function (data) { console.log('complete… ', data); });
//worker.on('error', function (err) { console.log('error… ', err); });

worker.start();

module.exports = queue;
