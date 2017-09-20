var redis = require('redis');
var client = redis.createClient();
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('connect', function() {
  console.log('connected');
});

client.on('error', function (error) {
  console.log(error);
});

module.exports = client