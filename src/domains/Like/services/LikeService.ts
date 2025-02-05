import { Like } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class LikeService {
    async createLike(body: Omit<Like, 'id'>) {
        try {
            return await prisma.like.create({
                data: {
                    userId: body.userId,
                    musicId: body.musicId,
                },
            });
        } catch (error) {
            console.error("Erro ao criar like:", error);
            throw new Error("Erro ao criar like");
        }
    }

    async getLikesByUserId(userId: number) {
        return this.findLikes({ userId }, { music: true });
    }

    async getLikesByMusicId(musicId: number) {
        return this.findLikes({ musicId });
    }

    async getMusicLikesCount(musicId: number) {
        try {
            return await prisma.like.count({ where: { musicId } });
        } catch (error) {
            console.error("Erro ao contar likes da música:", error);
            throw new Error("Erro ao contar likes");
        }
    }

    async deleteLike(userId: number, musicId: number) {
        try {
            return await prisma.like.delete({
                where: {
                    userId_musicId: { userId, musicId },
                },
            });
        } catch (error) {
            console.error("Erro ao deletar like:", error);
            throw new Error("Erro ao deletar like");
        }
    }

    private async findLikes(where: object, include?: object) {
        try {
            return await prisma.like.findMany({ where, include });
        } catch (error) {
            console.error("Erro ao buscar likes:", error);
            throw new Error("Erro ao buscar likes");
        }
    }
}

export default new LikeService();
