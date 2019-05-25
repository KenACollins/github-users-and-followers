import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3+json'    // Force Github to return version 3 of the API.
    }
});