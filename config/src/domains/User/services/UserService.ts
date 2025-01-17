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
<<<<<<< HEAD

    async updateUser(id: string, body: User) {
		const user = await this.getUserbyId(id); 
		// Busca usuário cujos dados queremos editar para verificar sua existência.
		
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
		}); // Atualizamos esse usuário com os novos dados.
		return updatedUser;
=======
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
>>>>>>> 966b5106b3328d52f9252e5eb16e7e364b76a7b7
	}

}

export default new UserService();