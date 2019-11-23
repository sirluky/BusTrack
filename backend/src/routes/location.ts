// @ts-nocheck
import cors from 'cors';
import { Router } from 'express';
import { Location } from '../entity/Location';
import { Bus } from '../entity/Bus';
import { MoreThanOrEqual } from 'typeorm';
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

router.get('/all', async (req, res) => {
    // res.send('test pls books all give me pls, great you did it !!!');
    // let books = await Book.find({ take: 10, relations: ['author'] });
    // res.json(books);
    let LastMinutes = 1005;
    const LastLocations = await Location.find({ relations: ['bus'], where: { createDate: MoreThanOrEqual(new Date(new Date().getTime() - LastMinutes * 1000 * 60).toISOString().slice(0, 19).replace('T', ' ')) } })
    res.json(LastLocations.reverse());

})

router.get('/latestpos', async (req, res) => {
    let busy: [{ Location_bus_id: number, Location_bus_lat: number, Location_bus_lng: number, Location_createDate: Date }] = await Location.createQueryBuilder().orderBy('create_date', "DESC").where('create_date = :from_time', { from_time: new Date().getTime() - 100000000 }).execute();
    console.log(busy)
    busy = busy.map(bus => ({
        "bus_id": bus.Location_bus_id,
        lat: bus.Location_lat,
        lng: bus.Location_lng,
        id: bus.Location_id,
        createDate: bus.Location_create_date
    }))

    // console.log(bus);
    res.json(busy);


})

router.get('/test/latestpos', async (req, res) => {
    // let busy: [{ Location_bus_id: number, Location_bus_lat: number, Location_bus_lng: number }] = await Location.createQueryBuilder().orderBy('id', "DESC").groupBy('bus_id').execute();

    // busy = busy.map(bus => ({
    //     "bus_id": bus.Location_bus_id,
    //     lat: bus.Location_lat,
    //     lng: bus.Location_lng,
    //     id: bus.Location_id
    // }))

    // console.log(bus);
    // res.json(busy);

    res.json(await Bus.find());


})

router.get('/latestpos/:buscount', async (req, res) => {

    // res.json(await Location.find({ take: parseInt(req.params.buscount), order: { id: "DESC" } }))
    // res.json(await Location.findOneOrFail({ where: { bus_id: 1 }, order: { id: "DESC" } }));
})

router.post('/', async (req, res) => {
    try {

        // const kniha = new Book();

        // const author = await Author.findOneOrFail({ where: { id: 1 } });
        // kniha.author = author;

        // kniha.title = req.body.title;
        // kniha.desc = req.body.desc;
        // // kniha.author = req.body.author;
        // await kniha.save();
        // console.log(req.body)


    } catch (err) {
        throw err;
    }
    // res.send('done');
    // res.send('done');
    // const kniha = new Book({title:req.body.})
    // kniha.author = "Lukas Kovar";
    // kniha.desc = "Ale stejne se ho ma smysl naucit";
    // kniha.title = "Proc je JS lepsi nez PHP";
    // kniha.save();
    // res.json(kniha);
})

router.patch('/:id', async (req, res) => {
    // await Book.update({ id: parseInt(req.params.id) }, { desc: req.body.desc });
    // res.json(await Book.findOneOrFail(req.params.id));
})

router.delete('/:id', async (req, res) => {
    // await Book.delete({ id: parseInt(req.params.id) });
    // res.send(`deleted book with id:${req.params.id}`)
})
// router.get('/' async (req,res) => {
//     // res.send
// })

export { router as LocationRoutes };