const getObjectValueFromArray = (array, field) => {
    return array.filter(element => element.name === field)[0]?.value;
};

const getPlayerPos = (position) => {
    const map = {
        GK: 'Goalkeeper',
        D: 'Defender',
        M: 'Midfielder',
        F: 'Forward'
    };
    return map[position] || position; //fallback to position in case not defined correctly
};

export const getElement = (id) => {
    return document.querySelector(id);
};

export const drawPlayersList = (elementId, data) => {
    const onClickHandler = (player) => {
        const { 
            player: { 
                id,
                currentTeam,
                info: { 
                    position 
                }, 
                name: { 
                    first, 
                    last 
                } 
            },
            stats
        } = player;

        getElement('#content').style.visibility = 'visible';

        const appearances = getObjectValueFromArray(stats, 'appearances') || 0;
        const goals = getObjectValueFromArray(stats, 'goals') || 0;
        const assists = getObjectValueFromArray(stats, 'goal_assist') || 0;
        const passesTotal = (getObjectValueFromArray(stats, 'fwd_pass') || 0) + (getObjectValueFromArray(stats, 'backward_pass') || 0);
        const minsPlayed = getObjectValueFromArray(stats, 'mins_played') || 0;

        const goalsPerMatch = parseFloat(goals/appearances).toFixed(2);
        const passesPerMinute = parseFloat(passesTotal/minsPlayed).toFixed(2);

        getElement('#player-name').innerHTML = `${first} ${last}`;
        getElement('#player-position').innerHTML = getPlayerPos(position);
        getElement('#stat-appearances').innerHTML = appearances;
        getElement('#stat-goals').innerHTML = goals;
        getElement('#stat-assists').innerHTML = assists
        getElement('#stat-passes').innerHTML = passesPerMinute;
        getElement('#stat-goals-per-match').innerHTML = goalsPerMatch;
        getElement('#player-img').src = `/images/players/p${id}.png`;
        getElement('#crest').src = `/images/teams/${currentTeam?.id}.png`;
    };

    data.forEach((playerData) => {
        const { player: { id, name: { first, last } }} = playerData;
        const selectionElement = document.createElement('a');
        selectionElement.className = "dropdown-item";
        selectionElement.innerHTML = `${first} ${last}`;
        selectionElement.onclick = () => { onClickHandler(playerData) };

        elementId.appendChild(selectionElement);
    });
};
