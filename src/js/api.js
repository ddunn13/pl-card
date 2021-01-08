import config from '../config/config.js';

export const getPlayersData =() => {
    return fetch(config.dataUrl)
    .then(response => response.json())
    .then(obj => obj);
}