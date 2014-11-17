'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var google = require('googleapis');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

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

describe('GET /api/testYoutubes', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/testYoutubes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('test request should respond with JSON object', function(done) {
    request(app)
      .get('/api/testYoutubes/test')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it.only('experiment with YouTube API', function(done) {
    //console.log('API', youtube);

    var params = { part: 'snippet', id: 'UClEQqLc5V_j1wg1Ro8Hcrow' };
    var answer = youtube.channels.list(params,  function (err, response) {
      console.log('API', err, response);
      done();
    });






  });
});
