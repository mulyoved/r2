/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Testyoutube = require('./testYoutube.model');

exports.register = function(socket) {
  Testyoutube.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Testyoutube.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('testYoutube:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('testYoutube:remove', doc);
}