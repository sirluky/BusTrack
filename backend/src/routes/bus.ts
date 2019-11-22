// @ts-nocheck
import cors from 'cors';
import { Router } from 'express';
import { Location } from '../entity/Location';
import { Bus } from '../entity/Bus';
const router = Router();
// router.use(cors);

// router.use(function (req, res, next) {
//     if (req.session!.token === 'mytoken123') {
//         next();
//     } else {
//         res.send('unauthorized');
//     }
// });


router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now())
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})





router.get('/buses', async (req, res) => {
    // let busy: [{ Location_bus_id: number, Location_bus_lat: number, Location_bus_lng: number }] = await Location.createQueryBuilder().orderBy('id', "DESC").groupBy('bus_id').execute();

    // busy = busy.map(bus => ({
    //     "bus_id": bus.Location_bus_id,
    //     lat: bus.Location_lat,
    //     lng: bus.Location_lng,
    //     id: bus.Location_id
    // }))

    // console.log(bus);
    // res.json(busy);

    // res.json(await Bus.find());


})



export { router as BusRoutes };