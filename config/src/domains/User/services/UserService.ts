import { User } from "@prisma/client";
import prisma from "../../../../../config/prismaClient";

class UserService{
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
    async getUsers() {
		const users = await prisma.user.findMany( { orderBy: { name: 'asc' }}); 
		return users;
	}
    async getUserbyId(wantedId: string) {
		const user = await prisma.user.findFirst({ where: { id: wantedId } });
		return user; // Retorna esse usuário.
	}
    async getUserbyEmail(wantedEmail: string) {
		const user = await prisma.user.findFirst({ where: { email: wantedEmail } });
		return user;
	}

}

export default new UserService();