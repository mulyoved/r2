'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChannelSchema = new Schema({
  channelId: { type: String, unique : true, required : true, dropDups: true },
  title: String,
  description: String,
  publishedAt: String,
  thumbnails: String,
  googlePlusUserId: String,
  viewCount: String,
  subscriberCount: String,
  videoCount: String,
  brand_title: String,
  brand_keywords: String,
  image: String,
  mobile_image: String,
  relatedPlaylists: [{name:String, url:String}],
  topic: [String],
  featuredChannels: [String]
});

ChannelSchema.index({
  title: 'text',
  description: 'text',
  brand_title: 'text',
  brand_keywords: 'text',
  channelId: 'text'
});

var mongoosePaginate = require('mongoose-paginate');
ChannelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Channel', ChannelSchema);
