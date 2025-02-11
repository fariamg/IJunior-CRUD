import { Artist, Country } from '@prisma/client';
import prisma from '../../../../config/prismaClient';
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { NOTFOUND } from 'dns';
import { NotFoundError } from '../../../../errors/NotFoundError';
import CountryService from '../../Country/services/CountryService';

class ArtistService {

    async createArtist(body: Artist) {
         //Verificar se alguns elementos não são nulos
        if(body.name == null){
            throw new InvalidParamError("Nome do artista não informado!")
        }

        if(body.countryId == null){
            throw new InvalidParamError("País do artista não informado!")
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
            orderBy: { name: 'asc'},
            include: {
                country: true
        }});
        return artists;
    }

    async getArtistbyId(id: number) {
        if (id == null || isNaN(id)) {
            throw new InvalidParamError("Insira um id válido!");
        }

        const artist = await prisma.artist.findUnique({
            where: { id },
            include: {
                country: true
            }
        });

        if (!artist) {
            throw new NotFoundError(`Artista com id: ${id}; não encontrado`);
        }

        return artist;
    }

    async getArtistbyName(name: string) {
        if (name == null) {
            throw new InvalidParamError("Nome do artista não informado!");
        }

        const artist = await prisma.artist.findFirst({
            where: { name: {
                equals: name },
            },
            include: {
                country: true
            }
        });

        if (!artist) {
            throw new NotFoundError(`Artista com nome: ${name}; não encontrado`);
        }

        return artist;
    }

    async getArtistsbyCountry(country: string) {
        if (country == null) {
            throw new InvalidParamError("País não informado!");
        }

        await CountryService.getCountrybyName(country);

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
            throw new NotFoundError(`não encontrado`);
        }
        return artists;
    }

    async updateArtist(id: number, body: Artist) {
        if (id == null || isNaN(id)) {
            throw new InvalidParamError("Insira um id válido!");
        }

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

}

export default new ArtistService();