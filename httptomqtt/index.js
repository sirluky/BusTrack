const mqtt = require('mqtt')
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')




var client = mqtt.connect('mqtt://192.168.108.107')



// client.on('connect', function () {
//     client.subscribe('presence', function (err) {
//         if (!err) {
//             client.publish('presence', 'Hello mqtt')
//         } else {
//             console.error('nejede to!!');
//         }
//     })
//     console.log('hmm');
// })

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(message.toString())
//     client.end()
// })

const app = express();

app.use(cors());
app.use(bodyparser.json());

client.on('connect', function () {
    client.subscribe('GPS', function (err) {
        if (!err) {

            // client.publish('GPS', JSON.stringify(req.body))
            //             client.publish('GPS', `
            // {"app_id":"bustrack","dev_id":"bus_1","hardware_serial":"00D4AD75CAF5BD54","port":2,"counter":174,"payload_raw":"DgEAAAAAAAAAAAAAAA==","payload_fields":{"altitude":123,"latitude":456,"longitude":789,"sats":0,"temperature":999},"metadata":{"time":"2019-11-22T21:04:51.093955727Z","frequency":868.5,"modulation":"LORA","data_rate":"SF8BW125","coding_rate":"4/5","gateways":[{"gtw_id":"eui-b827ebfffec6e5d0","timestamp":2618530724,"time":"2019-11-22T21:04:51.072879Z","channel":2,"rssi":-117,"snr":-5.5,"rf_chain":1,"latitude":49.19936,"longitude":16.57975,"altitude":320}]},"downlink_url":"https://integrations.thethingsnetwork.org/ttn-eu/api/v2/down/bustrack/12?key=ttn-account-v2.Qah3ulKsn9CZczqj7ZLzYCruuIn3YyejcFS5gaWkT0c"}
            // `)
            app.post('/', (req, res) => {
                // res.json()
                console.log(new Date(), 'nova poloha');
                console.log(JSON.stringify(req.body));
                client.publish('GPS', JSON.stringify(req.body));

                res.send('OK');
            })

            app.listen(3000, e => console.log('Running server on 90.177.25.227:3000'))
        }
    })
    console.log('connected')
})







client.on('message', function (topic, message) {
    // message is Buffer
    // console.log(message.toString())
})
