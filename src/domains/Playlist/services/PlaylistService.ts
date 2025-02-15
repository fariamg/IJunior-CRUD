import { Playlist } from "@prisma/client";
import prisma from "../../../../config/client";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { NotFoundError } from "../../../../errors/NotFoundError";

class PlaylistService {
    async createPlaylist(body: Omit<Playlist, 'id'>, creatorId: number, collaboratorIds?: number[]) {
        if (!creatorId || isNaN(creatorId)) {
            throw new InvalidParamError("Insira um ID de criador válido");
        }

        return await prisma.playlist.create({
            data: {
                ...body,
                creatorId,
                collaborators: collaboratorIds ? { connect: collaboratorIds.map(id => ({ id })) } : undefined,
            },
        });
    }

    async getPlaylists() {
        const playlists = await prisma.playlist.findMany({
            include: { creator: { omit: { password: true } }, musics: true, collaborators: { omit: { password: true } } },
        });
        
        if (!playlists.length) {
            throw new NotFoundError("Nenhuma playlist encontrada");
        }
        
        return playlists;
    }

    async getPlaylistById(id: number) {
        if (!id || isNaN(id)) {
            throw new InvalidParamError("Insira um ID de playlist válido");
        }

        const playlist = await prisma.playlist.findUnique({
            where: { id },
            include: { creator: { omit: { password: true } }, musics: true, collaborators: { omit: { password: true } } },
        });

        if (!playlist) {
            throw new NotFoundError(`Playlist com ID ${id} não encontrada`);
        }

        return playlist;
    }

    async getPlaylistsByCreatorId(creatorId: number) {
        if (!creatorId || isNaN(creatorId)) {
            throw new InvalidParamError("Insira um ID de criador válido");
        }

        const playlists = await prisma.playlist.findMany({
            where: { creatorId },
            include: { creator: { omit: { password: true } }, musics: true, collaborators: { omit: { password: true } } },
        });

        if (!playlists.length) {
            throw new NotFoundError("Nenhuma playlist encontrada");
        }

        return playlists;
    }

    async getPlaylistsByName(name: string) {
        if (!name) {
            throw new InvalidParamError("Insira um nome de playlist válido");
        }

        const playlist = await prisma.playlist.findMany({
            where: { name },
            include: { creator: { omit: { password: true } }, musics: true, collaborators: { omit: { password: true } } },
        });

        if (!playlist.length) {
            throw new NotFoundError(`Playlist(s) com nome ${name} não encontrada`);
        }

        return playlist;
    }

    async getMusicsFromPlaylist(playlistId: number) {
        if (!playlistId || isNaN(playlistId)) {
            throw new InvalidParamError("Insira um ID de playlist válido");
        }

        const playlist = await prisma.playlist.findUnique({
            where: { id: playlistId },
            include: { musics: true },
        });

        if (!playlist) {
            throw new NotFoundError(`Playlist com ID ${playlistId} não encontrada`);
        }

        return playlist.musics;
    }

    async addMusicToPlaylist(playlistId: number, musicId: number) {
        return this.updatePlaylistRelations(playlistId, 'musics', 'connect', musicId);
    }

    async removeMusicFromPlaylist(playlistId: number, musicId: number, userId: number) {
        if (userId != (await this.getPlaylistById(playlistId)).creatorId) {
            throw new InvalidParamError("Somente o criador da playlist pode remover músicas");
        }

        return this.updatePlaylistRelations(playlistId, 'musics', 'disconnect', musicId);
    }

    async addCollaboratorToPlaylist(playlistId: number, collaboratorId: number) {
        return this.updatePlaylistRelations(playlistId, 'collaborators', 'connect', collaboratorId);
    }

    async deletePlaylist(playlistId: number, userId: number) {
        if (userId != (await this.getPlaylistById(playlistId)).creatorId) {
            throw new InvalidParamError("Somente o criador da playlist pode apagar essa playlist")
        }

        await this.getPlaylistById(playlistId);
        await prisma.playlist.delete({ where: { id: playlistId } });
    }

    private async updatePlaylistRelations(playlistId: number, relation: 'musics' | 'collaborators', action: 'connect' | 'disconnect', relatedId: number) {
        if (!playlistId || isNaN(playlistId) || !relatedId || isNaN(relatedId)) {
            throw new InvalidParamError("IDs inválidos");
        }
        
        await this.getPlaylistById(playlistId);
        return await prisma.playlist.update({
            where: { id: playlistId },
            data: { [relation]: { [action]: { id: relatedId } } },
        });
    }
}

export default new PlaylistService();
