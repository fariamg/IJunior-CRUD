import { Artist } from '@prisma/client';
import prisma from '../../../../config/prismaClient';
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

class ArtistService {

    async createArtist(body: Artist) {

         //Verificar se alguns elementos não são nulos
        if(body.name == null){
            throw new InvalidParamError("Nome do artista não informado!")
        }
        
        const artist = await prisma.artist.create({
            data: {
                name: body.name,
                photo: body.photo,
                bio: body.bio,
                listeners: body.listeners,
                country: {
                    connect: {
                        id: body.countryId
                    },
                }
            }
        });
        return artist
    }

    async getArtists() {
        const artists = await prisma.artist.findMany({
            include: {
            country: true
        }});
        return artists;
    }

    async getArtistbyId(id: number) {
        const artist = await prisma.artist.findUnique({
            where: { id },
            include: {
                country: true
            }
        });

        if (!artist) {
            throw new QueryError(`Id ${id} não encontrado`);
        }

        return artist;
    }

    async getArtistbyName(name: string) {
        const artist = await prisma.artist.findFirst({
            where: { name: {
                equals: name },
            },
            include: {
                country: true
            }
        });

        if (!artist) {
            throw new QueryError(`Nome ${name} não encontrado`);
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
            include: {
                country: true
            }
        });
    
        if (!artists.length) {
            throw new Error(`País ${country} não encontrado`);
        }
        return artists;
    }

    async updateArtist(id: number, body: Artist) {
        
        await this.getArtistbyId(id);

        if(body.name == null){
            throw new InvalidParamError("Nome do artista não pode ser nulo!")
        }

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
        await this.getArtistbyId(id);

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