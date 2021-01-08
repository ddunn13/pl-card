import { getElement, drawPlayersList } from './util.js';
import { getPlayersData } from './api.js';

const init = async () => {
    try {
        const data = await getPlayersData();
        drawPlayersList(getElement('#dropdown-content'), data?.players);
    } catch (e) {
        console.error('error occurred, cannot get data', e);
    }
};

(() => {
    document.addEventListener('DOMContentLoaded', () => {
       init();
    });
})();
