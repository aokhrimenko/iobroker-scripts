
on({id: 'panasonic-viera.0.info.connection', val: false}, function() {
    let kodiState = getState('kodi.0.state').val,
        kodiType = getState('kodi.0.info.type').val;

    console.log('TV has been switched off. Kodi state: '+kodiState+'. Kodi type: '+kodiType);

    if ('play' !== kodiState ) {
        console.log('Kodi is playing nothing - ignoring.');

        return;
    }

    if ('channel' === kodiType) {
        setState('kodi.0.stop', true);
        console.log('Kodi is playing channel - stop.');
    } else if ('movie' === kodiType) {
        setState('kodi.0.pause', true);
        console.log('Kodi is playing movie - pause.');
    }
});

