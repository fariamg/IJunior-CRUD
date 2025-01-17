import UserService from "./config/src/domains/User/services/UserService";


// CREATE


async function main(){
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
}


// UPDATE

const id = 1;
async function main2(){
    const body = {
        id: 1,
        name:"Teste5",
        email: "teste5@gmail.com",
        photo: null,
        password: "teste5",
        role: "admin2"
    }

    const user = await UserService.updateUser(id, body)
    console.log(user);
    
}




main2()

