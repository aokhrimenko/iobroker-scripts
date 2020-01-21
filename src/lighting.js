let balconyLeft = 'zigbee.0.00158d00024d6442.left_state',
    balconyRight = 'zigbee.0.00158d00024d6442.right_state',
    doorOpenedState = 'zigbee.0.00158d0001e48a43.opened',
    doorMovementState = 'zigbee.0.00158d0002251720.occupancy';

let group = {
    'corridor group 4': [
        'miio.0.devices.72116779.power',
        'miio.0.devices.71816077.power',
        'miio.0.devices.92654529.power',
        'miio.0.devices.72081252.power'
    ],
    'corridor group 6': [
        'miio.0.devices.92649531.power',
        'miio.0.devices.92647002.power',
        'miio.0.devices.93247534.power',
        'miio.0.devices.92804353.power',
        'miio.0.devices.92655254.power',
        'miio.0.devices.93283565.power'
    ],
    'welcome light': [
        'miio.0.devices.71816077.power',
        'miio.0.devices.72081252.power'
    ],
};

let clickMap = {
    'zigbee.0.00158d00026b9743.right_click': [balconyRight],
    'zigbee.0.00158d00026b9743.left_click': [balconyLeft],
    'zigbee.0.00158d00026b9743.both_click': [balconyLeft,balconyRight],
    'zigbee.0.00158d00026bb7d7.right_click': group['corridor group 4'],
    'zigbee.0.00158d00026bb7d7.left_click': group['corridor group 6'],
};

for (let [sourceId, targetIdArray] of Object.entries(clickMap)) {
    on({id: sourceId, val: true}, function(){ toggle(targetIdArray); });
}

on({id: doorMovementState, val: true}, function(event){
    console.log('movement');
    temporaryOn(group['welcome light'], 120000); // for 2 min
});

function temporaryOn(ids, timeout) {
    ids.forEach(function(id) {
        clearStateDelayed(id);
        setState(id, true);
        setStateDelayed(id, false, timeout);
    });    
}

function toggle(states) {
    switchIds(states, !isOn(states));
}

function switchIds(ids, newState) {
    let delay = 0, interval = 250;

    ids.forEach(function(id) {
        setStateDelayed(id, newState, delay+=interval);
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

