import { Playlist } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class PlaylistService {
    async createPlaylist(body: Playlist, creatorId: number, colaboratorIds?: number[]) {
        const playlist = await prisma.playlist.create({
            data: {
                name: body.name,
                creatorId: creatorId,
                collaborators: colaboratorIds ? { connect: colaboratorIds.map(id => ({ id })) } : undefined,
            },
        });
        return playlist;
    }

    async addMusicToPlaylist(playlistId: number, musicId: number) {
        return await prisma.playlist.update({
            where: { id: playlistId },
            data: {
                musics: {
                    connect: { id: musicId },
                },
            },
        });
    }

    async addCollaboratorToPlaylist(playlistId: number, collaboratorId: number) {
        return await prisma.playlist.update({
            where: { id: playlistId },
            data: {
                collaborators: {
                    connect: { id: collaboratorId },
                },
            },
        });
    }

    async getPlaylists() {
        return await prisma.playlist.findMany({
            include: { creator: true, musics: true, collaborators: true },
        });
    }

    async getPlaylistById(id: number) {
        const playlist = await prisma.playlist.findUnique({
            where: { id },
            include: { creator: true, musics: true, collaborators: true },
        });

        if (!playlist) {
            throw new Error(`Id  ${id} não encontrado`);
        }

        return playlist;
    }

    async getPlaylistByName(name: string) {
        const playlist = await prisma.playlist.findFirst({
            where: { name: name },
            include: { creator: true, musics: true, collaborators: true },
        });

        if (!playlist) {
            throw new Error(`Nome  ${name} não encontrado`);
        }

        return playlist;
    }

    async getPlaylistsByCreatorId(creatorId: number) {
        return await prisma.playlist.findMany({
            where: { creatorId },
            include: { creator: true, musics: true, collaborators: true },
        });
    }

    async getMusicsFromPlaylist(playlistId: number) {
        const playlist = await prisma.playlist.findUnique({
            where: { id: playlistId },
            include: { musics: true },
        });

        if (!playlist) throw new Error("Playlist not found");
        return playlist.musics;
    }

    async updatePlaylist(id: number, body: Playlist) {
        const playlist = await this.getPlaylistById(id);

        const updatedPlaylist = await prisma.playlist.update({
            data: {
                name: body.name,
            },
            where: {
                id: id,
            },
        });

        return updatedPlaylist;
    }

    async removeMusicFromPlaylist(playlistId: number, musicId: number) {
        return await prisma.playlist.update({
            where: { id: playlistId },
            data: {
                musics: {
                    disconnect: { id: musicId },
                },
            },
        });
    }

    async deletePlaylist(wantedId: number) {
        const playlist = await this.getPlaylistById(wantedId);
        if (playlist) {
            await prisma.playlist.delete({
                where: { id: wantedId },
            });
        }
    }
}


export default new PlaylistService();
