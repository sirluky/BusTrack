import * as mqtt from 'mqtt'
import { Location } from './entity/Location'
import { Bus } from './entity/Bus'
import { join } from 'path'


export function MqttStart() {
    var client = mqtt.connect('mqtt://90.177.25.227')

    client.on('connect', function () {
        client.subscribe('gps', function (err) {
            if (!err) {
                // client.publish('GPS', 'Hello mqtt')
            }
        })
    })

    client.on('message', async function (topic, message) {
        switch (topic) {
            case 'gps':
                // let bus = new Bus()
                // bus.lokace = 
                console.log(`GPS is : ${message.toString()}`);
                // const loc = new Location();
                // loc.bus_id = 1;
                // loc.save()
                const json = JSON.parse(message.toString());
                // console.log(json, 'json data!!!');
                const [latitude, longitude] = json.split(',');
                console.log(latitude, longitude, 'jej')

                let bus_1 = await Bus.findOneOrFail({ where: { name: 'bus_1' } })

                const loc1 = new Location();
                loc1.alt = Math.floor(Math.random() * 1000);
                loc1.lat = parseFloat(latitude);
                loc1.lng = parseFloat(longitude);
                loc1.co2 = Math.floor(Math.random() * 20000) / 50;
                loc1.bus = bus_1;
                loc1.temperature = Math.floor(Math.random() * 200 + 100) / 10;

                loc1.save()

                // let bus_2 = await Bus.findOneOrFail({ where: { name: 'bus_2' } })


                // const loc2 = new Location();
                // loc2.alt = Math.floor(Math.random() * 1000);
                // loc2.lat = Math.floor(Math.random() * 50 - 25);
                // loc2.lng = Math.floor(Math.random() * 50 - 25);
                // loc2.co2 = Math.floor(Math.random() * 20000) / 50;
                // loc2.temperature = Math.floor(Math.random() * 200 + 100) / 10;

                // loc2.bus = bus_2;
                // loc2.save()

                // let bus_3 = await Bus.findOneOrFail({ where: { name: 'bus_3' } })



                // const loc3 = new Location();
                // loc3.alt = Math.floor(Math.random() * 1000);
                // loc3.lat = Math.floor(Math.random() * 50 - 25);
                // loc3.lng = Math.floor(Math.random() * 50 - 25);
                // loc3.co2 = Math.floor(Math.random() * 20000) / 50;
                // loc3.temperature = Math.floor(Math.random() * 200 + 100) / 10;
                // loc3.bus = bus_3;
                // loc3.save()




                // const { latitude, longitude, altitude, temperature } = json.payload_fields;
                // console.log(latitude, longitude, altitude, 'New Location');
                // // let bus = new Bus()
                // let loc = new Location();

                // // bus.name = json.dev_id;
                // // bus.lokace = new Location();
                // loc.lat = latitude;
                // loc.lng = longitude;
                // loc.alt = altitude;
                // loc.temperature = temperature
                // let bus = await Bus.findOneOrFail({ where: { name: json.dev_id } });
                // loc.bus = bus;



                // loc.save();

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