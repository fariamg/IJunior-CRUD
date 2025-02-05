import { Playlist } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class PlaylistService {

    async createPlaylist(body: Playlist, creatorId: number) {
        const playlist = await prisma.playlist.create({
            data: {
                name: body.name,
                creatorId: creatorId,
            }
        });
        return playlist
    }
}