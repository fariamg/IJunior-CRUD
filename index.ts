import UserService from "./config/src/domains/User/services/UserService";
import ArtistService from "./config/src/domains/Artist/services/ArtistService";

async function clearDatabase(){ // Função para limpar o banco de dados para teste
    await UserService.deleteAll();
    await ArtistService.deleteAll();
}

// // CREATE
(async () => {
    clearDatabase();

    const body = {
        id: 0,
        name:"Teste",
        email: "teste@gmail.com",
        photo: null,
        password: "Senha123",
        role: "admin"
    } 
    const user = await UserService.create(body)
    console.log(user);

    const body2 = {
        id: 0,
        name: "ArtistaTeste",
        photo: null,
        bio: "BioTeste",
        listeners: 0,
        createdAt: new Date()
    }
    const artist = await ArtistService.create(body2)
    console.log(artist);
})(); //Função IIFE se autoinvoca


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
