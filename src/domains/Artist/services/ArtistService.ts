import { Artist } from '@prisma/client';
import prisma from '../../../../config/prismaClient';

class ArtistService {

    async createArtist(body: Artist) {
        const artist = await prisma.artist.create({
            data: {
                name: body.name,
                photo: body.photo,
                bio: body.bio,
                listeners: body.listeners,
            
            }
        });
        return artist
    }

    async getArtists() {
        const artists = await prisma.artist.findMany({ 
            orderBy: { name: 'asc' },
            include: { musics: true }
        });
        return artists;
    }

    async getArtistbyId(id: number) {
        const artist = await prisma.artist.findUnique({
            where: { id },
        });

        if (!artist) {
            throw new Error(`Id  ${id} não encontrado`);
        }

        return artist;
    }

    async getArtistbyName(name: string) {
        const artist = await prisma.artist.findFirst({
            where: { name: {
                equals: name },

            },
        });

        if (!artist) {
            throw new Error(`Nome  ${name} não encontrado`);
        }

        return artist;
    }

    async getArtistsbyCountry(country: string) {
        const artists = await prisma.artist.findMany({
            where: {
                country: {
                    name: country
                }
            },
        });
    
        if (!artists.length) {
            throw new Error(`País ${country} não encontrado`);
        }
        return artists;
    }

    async updateArtist(id: number, body: Artist) {
        const artist = await this.getArtistbyId(id);

        const updatedArtist = await prisma.artist.update({
            data: {
                name: body.name,
                photo: body.photo,
                bio: body.bio,
                listeners: body.listeners,
            },
            where: {
                id: id
            }
        });
        return updatedArtist;
    }

    async deleteArtist(id: number) {
        const artist = await this.getArtistbyId(id);

        const deletedArtist = await prisma.artist.delete({
            where: {
                id: id
            }
        });


        return deletedArtist;
    }

    async deleteAll() {
        const deletedArtists = await prisma.artist.deleteMany();
        return deletedArtists;
    }
}

export default new ArtistService();