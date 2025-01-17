import UserService from "./config/src/domains/User/services/UserService";

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

main()