import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 24 * 60 * 60 * 1000,
});

const baseURL = "http://localhost:3000";


const Axios = axios.create({
    baseURL,
    timeout: 80000,
    adapter: cache.adapter,
});

export { Axios };