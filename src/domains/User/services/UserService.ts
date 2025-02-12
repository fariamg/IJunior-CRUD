import { User } from "@prisma/client";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import bcrypt from "bcrypt";
import prisma from "../../../../config/prismaClient";
import crypto from "crypto";



class UserService {
    async createToken(email: string) {
        if (!email) {
            throw new InvalidParamError("Email não informado!");
        }

        await this.getUserbyEmail(email);

        const token: string = crypto.randomBytes(20).toString("hex");
        const date = new Date();
        date.setHours(date.getHours() + 1);

        await prisma.forgotPassword.create({
            data: {
                token: token,
                expiresAt: date,
                user : {
                    connect: {
                        email: email
                    }
                }
            }
        });

        const info = {
            email: email,
            token: token
        }

        sendEmail(info);
    }

    async validateToken(email: string, token: string, password: string) {
        const user = await prisma.user.findFirst({where: {email: email}});
        const timeNow = new Date();

        if ((user?.tokenRecPass != token) || (user.dateRecPass != null && timeNow > user.dateRecPass)) {
            throw new InvalidParamError('Token inválido.');
        }

        await this.updatePassword(user.id, password);
    }

    async encryptPassword(password: string){
        const saltRounds = 10;
        const encrypted = await bcrypt.hash(password, saltRounds);
        return encrypted;
    }

    // C - CRUD - Criação de um novo usuário
    async createUser(body: User) {
        
        //Verificar se existe usuário com determinado email
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }

        });
        if(checkUser){
            throw new QueryError("Esse email já está cadastrado!");
        }

        //Verificar se alguns elementos não são nulos
        if(body.email == null){
            throw new InvalidParamError("Email não informado!")
        }
        if(body.password == null){
            throw new InvalidParamError("Senha não informada!")
        }
        if(body.fullName == null){
            throw new InvalidParamError("Nome completo não informado!")
        }
        
        //Restringe o parâmetro a seguir determinado padrão de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            throw new InvalidParamError("Formato de email inválido!");
        }


        const encrypted = await this.encryptPassword(body.password);

        // Criação do objeto

        const user = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                photo: body.photo,
                password: encrypted,
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
                country: true,
                listenedMusics: true
            }
        }); 
        return users;
    }

    async getUserbyEmail(wantedEmail: string) {
        const user = await prisma.user.findUnique({
            where: { email: wantedEmail },
            include: {
                country: true,
                listenedMusics: true
            }
        });

        if(!user){
            throw new QueryError(`Usuário com email ${wantedEmail} não encontrado!`);
        }

        return user;
    }
    
    async getUserbyId(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                country: true,
                listenedMusics: true
            }
        });
    
        if (!user) {
            throw new QueryError(`Id ${id} não encontrado`);
        }
        return user;
    }

    async getUserMusics(id : number) {
        const user = await this.getUserbyId(id);
        return user.listenedMusics;
    }

    // U - CRUD - Update de algum usuário baseado no ID
    async updateUser(id: number, body: User, loggedInUserId: number) {

        // Verificar se o id do usuário logado corresponde ao id passado na requisição
        if (id !== loggedInUserId) {
            throw new InvalidParamError("Você não tem permissão para atualizar este usuário.");
        }

        await this.getUserbyId(id); //usado para verificar se existe usuário com esse ID

        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
    
        if (existingUser && existingUser.id !== id) {
            throw new InvalidParamError("Este email já está em uso.");
        }

        if(body.email == null){
            throw new InvalidParamError("Email não pode ser nulo!")
        }
    
        if(body.fullName == null){
            throw new InvalidParamError("Nome completo não pode ser nulo!")
        }

        const updatedUser = await prisma.user.update({
            omit: {
                password: true
            },
            data: {
                fullName:body.fullName,
                email: body.email,
                photo: body.photo,
                country: {
                    connect: {
                        id: body.countryId
                    }
                }
            },
            where: {
                id: id
            }
        }); 
        return updatedUser;
    }

    async updatePassword(userId: number, newPassword: string) {
        await this.getUserbyId(userId);

        if (userId != (await this.getUserbyId(userId)).id) {
            throw new InvalidParamError("Você não tem permissão para atualizar este usuário.");
        }

        const encryptedPassword = await this.encryptPassword(newPassword);
    
        // Atualizar a senha no banco de dados
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                password: encryptedPassword // Nova senha criptografada
            }
        });
    
        return updatedUser;
    }

    // D - CRUD - Deletar um usuário baseado no ID
    async deleteUser(wantedId: number, loggedInUserId: number) {
        if (wantedId !== loggedInUserId) {
            throw new InvalidParamError("Você não tem permissão para atualizar este usuário.");
        }
    
        await this.getUserbyId(wantedId);
        await prisma.user.delete(({ where: { id: wantedId } }));
    }
    
    async deleteAll() {
        const deletedUsers = await prisma.user.deleteMany();
        return deletedUsers;
    }

    //Adiciona uma música ao conjunto de músicas ouvidas
    async registerMusicListen(userId: number, musicId: number) {

        await this.getUserbyId(userId)

        await prisma.user.update({
            where: { id: userId },
            data: {
                listenedMusics: {
                    connect: { id: musicId } // Conecta a música ao usuário
                }
            }
        });
    }

    //Remove uma música ao conjunto de músicas ouvidas
    async removeMusicListen(userId: number, musicId: number) {
        // Verifica se o usuário existe
        await this.getUserbyId(userId);
    
        // Remove a música do conjunto de músicas ouvidas pelo usuário
        await prisma.user.update({
            where: { id: userId },
            data: {
                listenedMusics: {
                    disconnect: { id: musicId } // Remove a música do usuário
                }
            }
        });
    }
}

export default new UserService();