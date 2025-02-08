import { User} from "@prisma/client";
import prisma from "../../../../config/prismaClient";


class UserService {

    // C - CRUD - Criação de um novo usuário
    async createUser(body: User) {
        const user = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                photo: body.photo,
                password: body.password,
                role: body.role,
                country: {
                    connect: {
                        id: body.countryId
                    }
                }
            }
        });
        return user;
    }
    
    // R - CRUD - Leitura dos usuários da database manipulaçao do CRUD
    async getUsers() {
        const users = await prisma.user.findMany( {
            orderBy: { createdAt: 'asc'},
            include: {
                country: true
            }
        }); 
        return users;
    }

    async getUserbyEmail(wantedEmail: string) {
        const user = await prisma.user.findUnique({
            where: { email: wantedEmail },
            include: {
                country: true
            }
        });
        return user;
    }
    
    async getUserbyId(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                country: true
            }
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
                fullName:body.fullName,
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