import { Artist, Music } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class MusicService {

    async createMusic(body: Music, artistIds: number[]) {
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
            throw new Error(`Id  ${id} não encontrado`);
        }

        return music;
    }

    async getMusicbyName(name: string) {
        const music = await prisma.music.findFirst({
            where: { name: name },
        });

        if (!music) {
            throw new Error(`Nome  ${name} não encontrado`);
        }

        return music;
    }

    async updateMusic(id: number, body: Music) {
        const music = await this.getMusicbyId(id);

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
        const music = await this.getMusicbyId(id);

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