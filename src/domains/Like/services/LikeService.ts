import { Like, User, Music } from '@prisma/client';
import prisma from "../../../../config/prismaClient";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";
import UserService from "../../User/services/UserService";
import MusicService from "../../Music/services/MusicService";
import { NotFoundError } from '../../../../errors/NotFoundError';

class LikeService {
    async createLike(userId: number, musicId: number) {
        await UserService.getUserbyId(userId);
        await MusicService.getMusicbyId(musicId);

        const like = await prisma.like.create({
            data: { userId, musicId },
        });

        await prisma.music.update({
            where: { id: musicId },
            data: { likeCount: { increment: 1 } },
        });
        return like;
    }

    async getLikes() {
        const likes = prisma.like.findMany({ 
            include: {
                music: true,
                user: {
                    omit: {
                        password: true }}}
        });

        if (!likes) {
            throw new NotFoundError("Nenhum like encontrado");
        }

        return likes;
    }

    async getLikesByUserId(userId: number) {
        await UserService.getUserbyId(userId);

        const likes = await prisma.like.findMany({
            where: { userId: userId },
            include: {
                music: true,
            }
        });
        
        if (!likes.length) {
            throw new NotFoundError("Nenhum like encontrado para o usuario com id: " + userId);
        }

        return likes;
    }

    async getLikesByMusicId(musicId: number) {
        await MusicService.getMusicbyId(musicId);
        
        const likes = await prisma.like.findMany({
            where: { musicId: musicId },
            include: {
                music: true,
                user: {
                    omit: {
                        password: true }}}
        });
        
        if (!likes.length) {
            throw new NotFoundError("Nenhum like encontrado para a musica com id: " + musicId);
        }

        return likes;
    }


    
    async deleteLike(userId: number, musicId: number) {
        await UserService.getUserbyId(userId);
        await MusicService.getMusicbyId(musicId);

        const like = await prisma.like.findUnique({
            where: { userId_musicId: { userId, musicId } },
        });

        if (!like) {
            throw new NotFoundError("Like não encontrado");
        }

        await prisma.like.delete({
            where: { userId_musicId: { userId, musicId } },
        });

        await prisma.music.update({
            where: { id: musicId },
            data: { likeCount: { decrement: 1 } },
        });

        return like;
    }
}

export default new LikeService();
