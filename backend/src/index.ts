import "reflect-metadata";

import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import expressSessions from 'express-session';


// console.log('hello')
const app = express();
const PORT = 3000;

createConnection().then(async connection => {
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

    app.delete('/:param', (req, res) => {
        const id = req.params.id;
        console.log(id);
        res.send(`Param:${id} has been...`)
    })

})



app.listen(PORT, e => console.log(`listening on ${PORT}`))