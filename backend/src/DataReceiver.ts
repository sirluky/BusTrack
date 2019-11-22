import * as mqtt from 'mqtt'
import { Location } from './entity/Location'
import { Bus } from './entity/Bus'


export function MqttStart() {
    var client = mqtt.connect('mqtt://90.177.25.227')

    client.on('connect', function () {
        client.subscribe('GPS', function (err) {
            if (!err) {
                // client.publish('GPS', 'Hello mqtt')
            }
        })
    })

    client.on('message', function (topic, message) {
        switch (topic) {
            case 'GPS':
                // let bus = new Bus()
                // bus.lokace = 
                // console.log(`GPS is : ${message.toString()}`);
                // const loc = new Location();
                // loc.bus_id = 1;
                // loc.save()
                const json = JSON.parse(message.toString());
                console.log();

                const loc = new Location();
                const { latitude, longitude, altitude } = json.payload_fields;
                console.log(latitude, longitude, altitude);
                loc.lat = latitude;
                loc.lng = longitude;
                loc.alt = altitude;
                loc.save();

                // console.log('location saved')
                break;
        }
        // switch (topic) {
        //     case 'GPS':
        //         console.log(`GPS: ${message.toString()}`);
        //         break;
        // }
        // message is Buffer
        // console.log(message.toString(), topic)
        // client.end()
    })
}