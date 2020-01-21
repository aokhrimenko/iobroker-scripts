let buttons = [
    // Андрій ліжко
    'zigbee.0.00158d0002010bea',
    // Катя ліжко
    'zigbee.0.00158d0001f421d7',
    // Test
    'zigbee.0.00158d0002133d13',
];

let livingRoomState = 'zigbee.0.00158d0002493227.left_state',
    bedroomState = 'zigbee.0.00158d0002493227.right_state';

let states = [
    // Туалет
    'zigbee.0.00158d0002492a43.right_state',
    // Кухня
    'zigbee.0.00158d0002493046.left_state',
    'zigbee.0.00158d0002493046.right_state',
    // Гардероб
    'zigbee.0.00158d0002492fe5.right_state',
    // Коридор
    'miio.0.devices.72116779.power', // 4-1
    'miio.0.devices.71816077.power', // 4-2
    'miio.0.devices.92654529.power', // 4-3
    'miio.0.devices.72081252.power', // 4-4
    'miio.0.devices.92649531.power', // 6-1
    'miio.0.devices.92647002.power', // 6-2
    'miio.0.devices.93247534.power', // 6-3
    'miio.0.devices.92804353.power', // 6-4
    'miio.0.devices.92655254.power', // 6-5
    'miio.0.devices.93283565.power', // 6-6
    // Спальня
    livingRoomState,
    bedroomState,
];

for (const index in buttons) {
    on({id: buttons[index]+'.click', val: true}, function(){ toggle([livingRoomState]); });
    on({id: buttons[index]+'.double_click', val: true}, function(){ toggle([bedroomState]); });
    // on({id: buttons[index]+'.double_click', val: true}, nightToiletLight);
    on({id: buttons[index]+'.long_click', val: true}, goodNight);
}

function toggle(states) {
    isOn(states) ? switchOff(states) : switchOn(states);
}

function goodNight(){
    let delay = 0, step = 200;

    for (const index in states) {
        if (!getState(states[index]).val) {
            continue;
        }
        
        setStateDelayed(states[index], false, delay+=step);
    }
}

function nightToiletLight(){
    setStateDelayed('zigbee.0.00158d0002492fe5.right_state', true, 200);
    setStateDelayed('zigbee.0.00158d0002492a43.right_state', true, 400);
}

function switchOff(states) {
    let delay = 100, interval = 100;
    states.forEach(function(state) {
        setStateDelayed(state, false, delay+=interval);
    });
}

function switchOn(states) {
    let delay = 100, interval = 100;
    console.log('switchOn');
    console.log(states);

    states.forEach(function(state) {
        setStateDelayed(state, true, delay+=interval);
    });
}

/**
 * At least one should be with state=true
 */
function isOn(states) {
    let result = false;

    states.forEach(function(state) {
        result = result || getState(state).val;
    });

    return result;
}

