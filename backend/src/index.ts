import "reflect-metadata";

import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import expressSessions from 'express-session';
import { Location } from "./entity/Location";
import { MqttStart } from "./DataReceiver";
import { LocationRoutes } from "./routes/location";
import { BusRoutes } from "./routes/bus";


// console.log('hello')
const app = express();
const PORT = 3000;

createConnection().then(async connection => {
    // let loc = new Location();
    // loc.lat = 123.1236789;
    // loc.lng = 321.1236789;

    // loc.save();

    app.use(cookieParser());

    app.use(expressSessions({
        secret: "fdasfkasdjhfhfsjkd;aslkjfoweirhfnvsd",
        resave: false,
        saveUninitialized: false
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/all', (req, res) => {
        res.send('hello');
    })

    app.post('/login', (req, res) => {
        if (req.body.username === "Lukas" && req.body.pass === "1234") {
            req.session!.token = "mytoken123";
        }
        res.send("mytoken123");
    })

    // app.delete('/:param', (req, res) => {
    //     const id = req.params.id;
    //     console.log(id);
    //     res.send(`Param:${id} has been...`)
    // })

    app.use('/location', LocationRoutes);
    app.use('/bus', BusRoutes);


    app.get('/', (req, res) => {
        res.send('Hello there on my BUS API');
    })

    app.post('/')
    MqttStart();

})



app.listen(PORT, e => console.log(`listening on ${PORT}`))