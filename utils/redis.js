import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
      this.client = createClient();
      this.client.on('error', (err) => console.log(err));
      this.connected = false;
      this.client.on('connect', () => {
        this.connected = true;
      });
    }

    isAlive() {
        // Checking the connection status
        return this.client.connected;
    }

    async get(key) {
        // Using promisify for the get method
        const getAsync = promisify(this.client.get).bind(this.client);
        return await getAsync(key);
    }

    async set(key, value, duration) {
        // Using promisify for the set method
        const setAsync = promisify(this.client.set).bind(this.client);
        return await setAsync(key, value, 'EX', duration);
    }

    async del(key) {
        // Using promisify for the del method
        const delAsync = promisify(this.client.del).bind(this.client);
        return await delAsync(key);
    }
}

// Exporting an instance of RedisClient
const redisClient = new RedisClient();

export default redisClient;
