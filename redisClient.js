var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
  console.log('connected');
});

client.on('error', function (error) {
  console.log(error);
});

module.exports = client