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


            app.post('/', (req, res) => {
                // res.json()
                console.log(new Date(), 'nova poloha');
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
