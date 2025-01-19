import UserService from "./config/src/domains/User/services/UserService";
import ArtistService from "./config/src/domains/Artist/services/ArtistService";
import MusicService from "./config/src/domains/Music/services/MusicService";
import prisma from "./config/prismaClient";
import { Artist } from '@prisma/client';

// CREATE
(async () => {
    console.log(await UserService.createUser({
        name: "Teste",
        id: 0,
        email: "dasisdjij",
        photo: null,
        password: "Senha12dwsdws3",
        role: "user",
        createdAt: new Date()
    }))
    
    const artist = await ArtistService.createArtist({
        name: "ArtistaTeste",
        id: 0,
        photo: null,
        bio: "BioTeste",
        listeners: 129823193,
        createdAt: new Date()
    })
    console.log(artist);

    const artist2 = await ArtistService.createArtist({
        name: "ArtistaTeste",
        id: 0,
        photo: null,
        bio: "BioTeste",
        listeners: 129823193,
        createdAt: new Date()
    })
    console.log(artist);

    const newMusic = await MusicService.createMusic({
        name: "Nova Música",
        id: 0,
        createdAt: new Date(),
        duration: 240,
        recordDate: new Date(),
    }, [artist.id, artist2.id]); 
    console.log(newMusic);
})()
    .catch((e) =>  {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 


// // UPDATE
// (async () => {
//     clearDatabase();

//     const body = {
//         id: 0,
//         name:"Teste9W123893",
//         email: "dasisdjij",
//         photo: null,
//         password: "Senha12dwsdws3",
//         role: "user"
//     }
//     const user = await UserService.create(body)
//     console.log(user);

//     const body2 = {
//         id: 0,
//         name: "ArtistaTeste",
//         photo: null,
//         bio: "BioTeste",
//         listeners: 129823193,
//         createdAt: new Date()
//     }

//     const artist = await ArtistService.create(body2)
//     console.log(artist);
// })()
