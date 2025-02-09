import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { Artist, Music } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class MusicService {

    async createMusic(body: Music, artistIds: number[]) {

        //Verificar se alguns elementos não são nulos
        if(body.name == null){
            throw new InvalidParamError("Nome da música não informado!")
        }
        if(body.duration == null){
            throw new InvalidParamError("Duração da música não informada!")
        }
        if(body.recordDate == null){
            throw new InvalidParamError("Data de gravação da música não informada!")
        }
        if(artistIds == null){
            throw new InvalidParamError("ID do(s) artista(s) não informado(s)!")
        }

        const music = await prisma.music.create({
            data: {
                name: body.name,
                duration: body.duration,
                recordDate: body.recordDate,
                artists: {
                    connect: artistIds.map((id) => ({ id })),
                },
            },
            include: { artists: true }, 
        });
    
        return music;
    }

    async getMusics() {
        const musics = await prisma.music.findMany({ 
            orderBy: { name: 'asc' }, 
            include: { artists: true },
        });
        return musics;
    }

    async getMusicbyId(id: number) {
        const music = await prisma.music.findUnique({
            where: { id },
        });

        if (!music) {
            throw new QueryError(`Id  ${id} não encontrado`);
        }

        return music;
    }

    async getMusicbyName(name: string) {
        const music = await prisma.music.findFirst({
            where: { name: name },
        });

        if (!music) {
            throw new QueryError(`Nome  ${name} não encontrado`);
        }

        return music;
    }

    async updateMusic(id: number, body: Music) {
        
        await this.getMusicbyId(id);

        if(body.name == null){
            throw new InvalidParamError("Nome da música não pode ser nulo!")
        }
        if(body.duration == null){
            throw new InvalidParamError("Duração da música não pode ser nulo!")
        }
        if(body.recordDate == null){
            throw new InvalidParamError("Data de gravação da música não pode ser nula!")
        }

        const updatedMusic = await prisma.music.update({
            data: {
                name: body.name,
                duration: body.duration,
                recordDate: body.recordDate,
            },
            where: {
                id: id
            }
        });
        return updatedMusic;
    }

    async deleteMusic(id: number) {
        
        await this.getMusicbyId(id);

        const deletedMusic = await prisma.music.delete({
            where: {
                id: id
            }
        });
        return deletedMusic;
    }

    async deleteAll() {
        const deletedMusics = await prisma.music.deleteMany();
        return deletedMusics
    }
}

export default new MusicService();