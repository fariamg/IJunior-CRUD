import { Playlist } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class PlaylistService {
    async createPlaylist(body: Omit<Playlist, 'id'>, creatorId: number, collaboratorIds?: number[]) {
        try {
            return await prisma.playlist.create({
                data: {
                    ...body,
                    creatorId,
                    collaborators: collaboratorIds ? { connect: collaboratorIds.map(id => ({ id })) } : undefined,
                },
            });
        } catch (error) {
            throw new Error("Erro ao criar playlist");
        }
    }

    async addMusicToPlaylist(playlistId: number, musicId: number) {
        return this.updatePlaylistRelations(playlistId, 'musics', 'connect', musicId);
    }

    async removeMusicFromPlaylist(playlistId: number, musicId: number) {
        return this.updatePlaylistRelations(playlistId, 'musics', 'disconnect', musicId);
    }

    async addCollaboratorToPlaylist(playlistId: number, collaboratorId: number) {
        return this.updatePlaylistRelations(playlistId, 'collaborators', 'connect', collaboratorId);
    }

    async getPlaylists() {
        return await prisma.playlist.findMany({
            include: { creator: { omit: { password: true } }, musics: true, collaborators:  { omit: { password: true } } },
        });
    }

    async getPlaylistById(id: number) {
        return this.findPlaylist({ id });
    }

    async getPlaylistByName(name: string) {
        return this.findPlaylist({ name });
    }

    async getPlaylistsByCreatorId(creatorId: number) {
        return await prisma.playlist.findMany({
            where: { creatorId },
            include: { creator: { omit: { password: true } }, musics: true, collaborators:  { omit: { password: true } } },
        });
    }

    async getMusicsFromPlaylist(playlistId: number) {
        const playlist = await this.getPlaylistById(playlistId);
        return playlist.musics;
    }


    async deletePlaylist(id: number) {
        await this.getPlaylistById(id);
        await prisma.playlist.delete({ where: { id } });
    }

    private async findPlaylist(where: { id?: number; name?: string }) {
        const playlist = await prisma.playlist.findFirst({
            where,
            include: { creator:  { omit: { password: true } }, musics: true, collaborators:  { omit: { password: true } } },
        });
        if (!playlist) throw new Error(`Playlist não encontrada: ${JSON.stringify(where)}`);
        return playlist;
    }

    private async updatePlaylistRelations(playlistId: number, relation: 'musics' | 'collaborators', action: 'connect' | 'disconnect', relatedId: number) {
        await this.getPlaylistById(playlistId);
        return await prisma.playlist.update({
            where: { id: playlistId },
            data: { [relation]: { [action]: { id: relatedId } } },
        });
    }
}

export default new PlaylistService();
