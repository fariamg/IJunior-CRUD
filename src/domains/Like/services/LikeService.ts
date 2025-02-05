import { Like } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class LikeService {

    async createLike(body: Like) {
        const like = await prisma.like.create({
            data: {
                userId: body.userId,
                musicId: body.musicId,
            }
        });
        return like
    }

    async getLikesByUserId(userId: number) {
        const likes = await prisma.like.findMany({
            where: { userId },
            include: {
                music: true
            }
        });

        return likes;
    }

    async getLikesByMusicId(musicId: number) {
        const likes = await prisma.like.findMany({
            where: { musicId }
        });

        return likes;
    }

    async getMusicLikesCount(musicId: number) {
        const likes = await prisma.like.count({
            where: { musicId }
        });

        return likes;
    }

    async deleteLike(userId: number, musicId: number) {
        const like = await prisma.like.delete({
            where: {
                userId_musicId: {
                    userId,
                    musicId
                }
            }
        });

        return like;
    }
}