var io = require('socket.io');
var socket = io.connect('http://localhost');
socket.emit('RegisterClient', { my: 'data' });