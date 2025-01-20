import UserService from "./config/src/domains/User/services/UserService";
import ArtistService from "./config/src/domains/Artist/services/ArtistService";
import MusicService from "./config/src/domains/Music/services/MusicService";
import CountryService from "./config/src/domains/Country/services/CountryService";
import prisma from "./config/prismaClient";
import { Artist } from '@prisma/client';

// PARA TESTAR É SO DESCOMENTAR O CODIGO NA FUNÇÃO QUE VC QUER APLICAR, NÃO PRECISA CHAMAR A FUNÇÃO, ELA SE CHAMA SOZINHA (FUNÇÃO AUTO INVOCAVEL/IIFE)

//LEMBRAR DE POPULAR O BANCO DE DADOS COM DADOS ANTES DE RODAR O CODIGO

//SE QUISER LIMPAR O BANCO DE DADOS E REAPLICAR AS MIGRATES USAR COMANDO "npx prisma migrate reset"

//CREATE
// (async () => {
//     console.log(await CountryService.createCountry({
//         name: "Brasil",
//         id: 0,
//         continent: "America do Sul"
//     }))

//     console.log(await UserService.createUser({
//         name: "Teste",
//         id: 0,
//         email: "dasisdjij",
//         photo: null,
//         password: "Senha12dwsdws3",
//         role: "user",
//         createdAt: new Date(),
//         countryId: 1
//     }, 1))
    
//     const artist = await ArtistService.createArtist({
//         name: "ArtistaTeste",
//         id: 0,
//         photo: null,
//         bio: "BioTeste",
//         listeners: 129823193,
//         createdAt: new Date(),
//         countryId: 1
//     }, 1)
//     console.log(artist);

//     const artist2 = await ArtistService.createArtist({
//         name: "ArtistaTeste",
//         id: 0,
//         photo: null,
//         bio: "BioTeste",
//         listeners: 129823193,
//         createdAt: new Date(),
//         countryId: 1
//     }, 1)
//     console.log(artist);

//     const newMusic = await MusicService.createMusic({
//         name: "Nova Música",
//         id: 0,
//         createdAt: new Date(),
//         duration: 240,
//         recordDate: new Date(),
//     }, [artist.id, artist2.id]); 
//     console.log(newMusic);
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
//         name: "Testeajdbsjbda",
//         id: 216317367821,
//         email: "dasisdjij",
//         photo: null,
//         password: "Senha12dwsdws3",
//         role: "user",
//         createdAt: new Date()
//     }))

//     console.log(await ArtistService.updateArtist(1, {
//         name: "ArtistaTestedasjdadhuis",
//         id: 0,
//         photo: null,
//         bio: "BioTeste",
//         listeners: 129823193,
//         createdAt: new Date()
//     }))

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
