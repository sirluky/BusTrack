import { Bus } from "./entity/Bus";
import { Location } from "./entity/Location";

export function Faker() {
    setInterval(async () => {
        let bus_2 = await Bus.findOneOrFail({ where: { name: 'bus_2' }, relations: ['location'] })

        const loc2 = new Location();
        loc2.alt = 124;
        loc2.lat = bus_2.location[0].lat + Math.random() / 40 - 0.0125;
        loc2.lng = bus_2.location[0].lng + Math.random() / 40 - 0.0125;
        loc2.co2 = Math.floor(Math.random() * 200000) / 50;
        loc2.temperature = Math.floor(Math.random() * 200 + 100) / 10;

        // const loc2 = new Location();
        // loc2.alt = Math.floor(Math.random() * 1000);
        // loc2.lat = Math.floor(Math.random() * 50 - 25);
        // loc2.lng = Math.floor(Math.random() * 50 - 25);
        // loc2.co2 = Math.floor(Math.random() * 20000) / 50;
        // loc2.temperature = Math.floor(Math.random() * 200 + 100) / 10;

        loc2.bus = bus_2;
        loc2.save()

        // let bus_3 = await Bus.findOneOrFail({ where: { name: 'bus_3' } })



        // const loc3 = new Location();
        // loc3.alt = Math.floor(Math.random() * 1000);
        // loc3.lat = Math.floor(Math.random() * 50000 - 25000) / 1000;
        // loc3.lng = Math.floor(Math.random() * 50 - 25);
        // loc3.co2 = Math.floor(Math.random() * 200000) / 50;
        // loc3.temperature = Math.floor(Math.random() * 200 + 100) / 10;
        // loc3.bus = bus_3;
        // loc3.save()
    }, 15000)

}
// let bus_1 = await Bus.findOneOrFail({ where: { name: 'bus_1' } })

// const loc1 = new Location();
// loc1.alt = Math.floor(Math.random() * 1000);
// loc1.lat = parseFloat(latitude);
// loc1.lng = parseFloat(longitude);
// loc1.co2 = Math.floor(Math.random() * 20000) / 50;
// loc1.bus = bus_1;
// loc1.temperature = Math.floor(Math.random() * 200 + 100) / 10;

// loc1.save()

