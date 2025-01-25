import UserService from "./config/src/domains/User/services/UserService";
import ArtistService from "./config/src/domains/Artist/services/ArtistService";
import MusicService from "./config/src/domains/Music/services/MusicService";
import CountryService from "./config/src/domains/Country/services/CountryService";
import prisma from "./config/prismaClient";
import { Role } from "@prisma/client";
import { Artist } from '@prisma/client';
import { app } from "./config/expressConfig";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log("Servidor hosteado na porta " + process.env.PORT)
})
//CREATE
//(async () => {
    // console.log(await CountryService.createCountry({
    //     name: "Brasil",
    //     id: 0,
    //     continent: "America do Sul"
    // }))

    // console.log(await UserService.createUser({
    //     fullName: "Teste",
    //     id: 0,
    //     email: "dasisdjij",
    //     photo: null,
    //     password: "Senha12dwsdws3",
    //     role: Role.USER,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     countryId: 1,
    //     isActive: true
    // }, 1))
    
    // const artist = await ArtistService.createArtist({
    //     name: "ArtistaTeste",
    //     id: 0,
    //     photo: null,
    //     bio: "BioTeste",
    //     listeners: 129823193,
    //     createdAt: new Date(),
    //     countryId: 1
    // }, 1)
    // console.log(artist);

    // const artist2 = await ArtistService.createArtist({
    //     name: "ArtistaTeste",
    //     id: 0,
    //     photo: null,
    //     bio: "BioTeste",
    //     listeners: 129823193,
    //     createdAt: new Date(),
    //     countryId: 1
    // }, 1)
    // console.log(artist);

    // const newMusic = await MusicService.createMusic({
    //     name: "Nova Música",
    //     id: 0,
    //     createdAt: new Date(),
    //     duration: 240,
    //     recordDate: new Date(),
    // }, [artist.id, artist2.id]); 
    // console.log(newMusic);
// })()
//     .catch((e) =>  {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     }); 


// READ
// (async () => {
//      //Tive que usar esse stringify para conseguir visualizar o retorno
//     console.log(JSON.stringify(await UserService.getUsers(), null, 2));
//     console.log(JSON.stringify(await ArtistService.getArtists(), null, 2));
//     console.log(JSON.stringify(await MusicService.getMusics(), null, 2));
//     console.log(JSON.stringify(await MusicService.getMusicbyId(1), null, 2));
//     console.log(JSON.stringify(await ArtistService.getArtistbyId(1), null, 2));
//     console.log(JSON.stringify(await UserService.getUserbyId(1), null, 2));
//     console.log(JSON.stringify(await MusicService.getMusicbyName("Nova Música"), null, 2));
//     console.log(JSON.stringify(await ArtistService.getArtistbyName("ArtistaTeste"), null, 2));
//     console.log(JSON.stringify(await UserService.getUserbyEmail("dasisdjij"), null, 2));
// })()
//     .catch((e) =>  {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

// // UPDATE
// (async () => {

//     console.log(await UserService.updateUser(1, {
//         fullName: "Teste",
//         id: 1872398,
//         email: "dasisdjij",
//         photo: null,
//         password: "Senha12dwsdws3",
//         role: Role.USER,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         countryId: 1,
//         isActive: true
//     }))

//     console.log(await ArtistService.updateArtist(1,{
//             name: "ArtistaTesteAtualizado",
//             id: 0,
//             photo: null,
//             bio: "BioTeste",
//             listeners: 129823193,
//             createdAt: new Date(),
//             countryId: 1
//         }))

//     console.log(await MusicService.updateMusic(1, {
//         name: "Nova Músicaasjdnjasdnja",
//         id: 0,
//         createdAt: new Date(),
//         duration: 240,
//         recordDate: new Date(),
//     }));
// })()
//     .catch((e) =>  {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });

// DELETE
// (async () => {
//     console.log(await UserService.deleteUser(1));
//     console.log(await ArtistService.deleteArtist(1));
//     console.log(await MusicService.deleteMusic(1));
//     console.log(await MusicService.deleteAll());
//     console.log(await ArtistService.deleteAll());
//     console.log(await UserService.deleteAll());
// })();
