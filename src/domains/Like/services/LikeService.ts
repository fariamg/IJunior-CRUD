import { Like } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class LikeService {
    async likeMusic(userId: number, musicId: number) {
        try {
            const like = await prisma.like.create({
                data: { userId, musicId },
            });
    
            await prisma.music.update({
                where: { id: musicId },
                data: { likeCount: { increment: 1 } },
            });
        return { success: true, data: like };
        } catch (error) {
        return { success: false, error: "Erro ao curtir a música." };
        }
    }

    async getMusicLikeCount(musicId: number) {
        try {
            const music = await prisma.music.findUnique({
                where: { id: musicId },
                select: { likeCount: true },
            });
    
            if (!music) {
                return { success: false, error: "Música não encontrada." };
            }
    
            return { success: true, data: { musicId, likeCount: music.likeCount } };
        } catch (error) {
            return { success: false, error: "Erro ao buscar contador de likes." };
        }
    }

    async getLikesByUserId(userId: number) {
        return this.findLikes({ userId }, { music: true });
    }

    async getLikesByMusicId(musicId: number) {
        return this.findLikes({ musicId });
    }


    async deleteLike(userId: number, musicId: number) {
        try {
            return await prisma.like.delete({
                where: {
                    userId_musicId: { userId, musicId },
                },
            });
        } catch (error) {
            throw new Error("Erro ao deletar like");
        }
    }

    private async findLikes(where: object, include?: object) {
        try {
            return await prisma.like.findMany({ where, include });
        } catch (error) {
            throw new Error("Erro ao buscar likes");
        }
    }
}

export default new LikeService();
