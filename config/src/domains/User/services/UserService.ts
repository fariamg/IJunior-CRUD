import { User } from "@prisma/client";
import prisma from "../../../../../config/prismaClient";


class UserService {

    // C - CRUD, criação do body
    async create(body: User){
        const user =  await prisma.user.create({
            data: {
                name:body.name,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role
            }
        });

        return user;

    }
    // R - CRUD - Leitura dos usuários da database manipulaçao do CRUD
    async getUsers() {
        const users = await prisma.user.findMany( { orderBy: { name: 'asc' }}); 
        return users;
    }

    async getUserbyEmail(wantedEmail: string) {
        const user = await prisma.user.findFirst({ where: { email: wantedEmail } });
        return user;
    }
    async getUserbyId(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
    
        if (!user) {
            throw new Error(`Id  ${id} não encontrado`);
        }
    
        return user;
    }

    // U - CRUD - Update de algum usuário baseado no ID
    async updateUser(id: number, body: User) {
        const user = await this.getUserbyId(id); 

        const updatedUser = await prisma.user.update({
            data: {
                name:body.name,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role
            },
            where: {
                id: id
            }
        }); 
        return updatedUser;
    }
    // D - CRUD - Deletar um usuário baseado no ID
    async deleteUser(wantedId: number) {
		const user = await this.getUserbyId(wantedId);
	    if (user) {
			await prisma.user.delete(({ where: { id: wantedId } }));
		} 
	}
    
    async deleteAll() {
        const deletedUsers = await prisma.user.deleteMany();
        return deletedUsers;
    }
}

export default new UserService();