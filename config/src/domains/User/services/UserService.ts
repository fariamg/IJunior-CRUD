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
	}

}

export default new UserService();