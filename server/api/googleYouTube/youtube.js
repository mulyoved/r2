'use strict';
var Channel = require('../channel/channel.model');

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = '1080418801594-bn18n7c2g7c5gcq0in0r5aui0j5dt194.apps.googleusercontent.com';
var CLIENT_SECRET = '23mdHyk7vsC09Izqi9K9ZOWH';
var REDIRECT_URL = 'http://localhost:5000/oauth2callback';
var API_KEY = 'AIzaSyCl4eGz57Gjxcbn4YLQzgAqYNLrAmk1p54';

//Get from https://developers.google.com/oauthplayground/
var ACCESS_TOKEN_HERE = 'ya29.vQCoFdnE3-YYA11pBX170PFjNQip5RsiIP9h3oUAa_hPN04oYLXileG8SvN7SrR9UlEtyM7e_aNUzw';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({
  access_token: ACCESS_TOKEN_HERE
});

var scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

var youtube = google.youtube('v3');

function convertYoutubeChannel(item) {
var channel = new Channel( {
    channelId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnails: item.snippet.thumbnails.default.url,
    googlePlusUserId: item.contentDetails.googlePlusUserId,
    viewCount: item.statistics.viewCount,
    subscriberCount: item.statistics.subscriberCount,
    videoCount: item.statistics.videoCount,
    brand_title: item.brandingSettings.channel.title,
    brand_keywords: item.brandingSettings.channel.keywords,
    image: item.brandingSettings.image.bannerImageUrl,
    mobile_image: item.brandingSettings.image.bannerMobileImageUrl,
    featuredChannels: item.brandingSettings.channel.featuredChannelsUrls || []
  });

  if (item.topicDetails) {
    channel.topic = item.topicDetails.topicIds || [];
  }
  else {
    channel.topic =[];
  }


  channel.relatedPlaylists = [];
  for (var key in item.contentDetails.relatedPlaylists) {
    if (item.contentDetails.relatedPlaylists.hasOwnProperty(key)) {
      channel.relatedPlaylists.push({ name: key, url: item.contentDetails.relatedPlaylists[key]});
    }
  }

  return channel;
}

exports.getChannelInfo = function(channelId, save, callback) {
  var params = { part: 'snippet,statistics,contentDetails,topicDetails,status,brandingSettings,contentOwnerDetails', id: channelId, auth: oauth2Client };
  var answer = youtube.channels.list(params,  function (err, response) {
    if (err) {
      callback(err, null);
    }
    else {
      if (response.items && response.items.length > 0) {
        var channel = convertYoutubeChannel(response.items[0]);
        if (save) {
          channel.save();
        }
        callback(null, channel);
      }
      else {
        console.error(response);
        callback('Failed to retrieve channel info', null);
      }
    }
  });
};

