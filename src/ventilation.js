let ventilationAutoModeId = 'ventilation.autoMode';
let ventilationHumidityTresholdId = 'ventilation.humidityTreshold';

createState(ventilationAutoModeId, true);
createState(ventilationHumidityTresholdId, 60);

let showerHumidityId = 'zigbee.0.00158d000232390a.humidity';
let showerVentId = 'megadd.0.p13_shower_vent';

let toiletVentId = 'megadd.0.p5_toilet_vent';
let toiletVentTimeoutMinutes = 10;

on({id: showerHumidityId, change: 'ne'}, function(event){
    if (!getState(ventilationAutoModeId).val) {
        return;
    }

    let currentState = getState(showerVentId).val;
    let humidityTreshold = getState(ventilationHumidityTresholdId).val;
    
    if (!currentState && event.state.val >= humidityTreshold) {
        setState(showerVentId, true);
        log('Turn ventilation on, current humidity: '+event.state.val+'%, target humidity: '+humidityTreshold+'%');
    } else if (currentState && event.state.val <= (humidityTreshold-1)) {
        setState(showerVentId, false);        
        log('Turn ventilation off, current humidity: '+event.state.val+'%, target humidity: '+humidityTreshold+'%');
    }
});

// toilet ventilation
on({id: 'zigbee.0.00158d0001e7dbc5.click', val: true}, function(event){
    let currentState = getState(toiletVentId).val;

    if (currentState) {
        clearStateDelayed(toiletVentId);
        setState(toiletVentId, false);
    } else {
        setState(toiletVentId, true);
        setStateDelayed(toiletVentId, false, toiletVentTimeoutMinutes*60*1000, true);
    }
});

on({id: 'zigbee.0.00158d0001dbe49f.left_click', val: true}, function(event){
    let currentState = getState(showerVentId).val,
        isAutoMode = getState(ventilationAutoModeId).val;

    console.log('left click');
    console.log('isAutoMode: '+ (isAutoMode ? '1' : '0'));
    console.log('current state: '+ (currentState ? '1' : '0'));

    if (currentState) {
        setState(showerVentId, false);
        setState(ventilationAutoModeId, true);
    } else {
        setState(ventilationAutoModeId, false);
        setState(showerVentId, true);

    }
});
