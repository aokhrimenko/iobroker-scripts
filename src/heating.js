const treshold = 0.5,
    map = {
        'bedroom': {
            'heater': 'megadd.0.p1_bedroom_heating',
            'actual': 'alias.0.heating_bedroom.ACTUAL',
            'set': 'alias.0.heating_bedroom.SET' 
        },
        'kitchen': {
            'heater': 'megadd.0.p4_kitchen_heating',
            'actual': 'alias.0.heating_kitchen.ACTUAL',
            'set': 'alias.0.heating_kitchen.SET' 
        },
        'yasya': {
            'heater': 'megadd.0.p3_yasya_heating',
            'actual': 'alias.0.heating_yasya.ACTUAL',
            'set': 'alias.0.heating_yasya.SET' 
        },
        'stepan': {
            'heater': 'megadd.0.p2_stepan_heating',
            'actual': 'alias.0.heating_stepan.ACTUAL',
            'set': 'alias.0.heating_stepan.SET' 
        },
};

for (const key in map) {
    const config = map[key];
    on({id: config.actual, change: 'ne'}, temperatureChanged(config));
    on({id: config.set, change: 'ne'}, temperatureChanged(config));
}

function temperatureChanged(config) {
    return function(event) {
        let setValue = getState(config.set).val,
            actualValue = getState(config.actual).val,
            currentHeaterState = getState(config.heater).val,
            isHeatingCycle = event.id === config.actual && event.state.val > event.oldState.val,
            difference = actualValue - (isHeatingCycle ? treshold : -treshold) - setValue,
            newHeaterState = difference > 0;


        console.log('config: '+JSON.stringify(config));
        console.log('isHeatingCycle: '+isHeatingCycle.toString());
        console.log('difference: '+difference);
        console.log('newHeaterState: '+newHeaterState.toString());

        if (currentHeaterState === newHeaterState) {
            return;
        }

        setState(config.heater, newHeaterState);
    }
}
