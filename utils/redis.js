import redis from 'redis';

/**
 * Represents a Redis client
 */
class RedisClient {
  /**
   * Define new RedisCleint instance
   */
  constructor () {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.log('Error connecting to Redis:', error.message);
      this.connected = false;
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  /**
   * Checks the connection staus of the redisclient
   * @returns {boolean}
   */
  isAlive () {
    return !this.client.connected;
  }

  /**
   * Get the key
   * @param {string} key the key of the redis value
   * @returns the value for that key
   */
  async get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @param {Number} exptime - duration of the key on redis
   */
  async set (key, value, exptime) {
    this.client.set(key, value);
    this.client.expire(key, exptime);
  }

  /**
   * Removes string key
   * @param {string} key
   *
   */
  async del (key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
