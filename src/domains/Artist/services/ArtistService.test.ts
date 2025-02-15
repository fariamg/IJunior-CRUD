import { describe, test, expect } from '@jest/globals';
import { prismaMock } from '../../../../config/singleton';
import artistService from './ArtistService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import prisma from '../../../../config/client';
import CountryService from '../../Country/services/CountryService';
import { Artist } from '@prisma/client';
import { NotFoundError } from '../../../../errors/NotFoundError';
describe('create new artist', () => {
    test('Deve criar um novo artista', async () => { 
        const artist = {
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
        };

        prismaMock.artist.create.mockResolvedValue({
            id: 1,
            createdAt: new Date(),
            ...artist,
        });

        prismaMock.artist.findMany.mockResolvedValue([
            {
                id: 1,
                createdAt: new Date(),
                ...artist,
            }
        ]);

        await artistService.createArtist(artist);

        const [savedArtist] = await prismaMock.artist.findMany({
            where: { name: 'artist' },
        });

        expect(savedArtist.name).toEqual(artist.name);
    });
    
    test('Deve lançar um erro se o nome do artista não for informado', async () => {
        const artist = {
            name: undefined as unknown as string,
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
        };

        await expect(artistService.createArtist(artist)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o id do país não for informado', async () => {
        const artist = {
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: undefined as unknown as number,
        };

        await expect(artistService.createArtist(artist)).rejects.toThrow(InvalidParamError);
    });
});


describe('getArtists', () => {
    test('Deve retornar uma lista de artistas', async () => {
        prismaMock.artist.findMany.mockResolvedValue([
            {
                id: 1,
                name: 'artist',
                photo: 'photo',
                bio: 'bio',
                listeners: 0,
                countryId: 1,
                createdAt: new Date(),
            }
        ]);

        await expect(artistService.getArtists()).resolves.toHaveLength(1);
    });

    test('Deve retornar uma lista vazia se não houver artistas', async () => {
        prismaMock.artist.findMany.mockResolvedValue([]);

        await expect(artistService.getArtists()).resolves.toHaveLength(0);
    });

    test('Deve retornar uma lista de artistas ordenada por nome', async () => {
        prismaMock.artist.findMany.mockResolvedValue([
            {
                id: 1,
                name: 'artist',
                photo: 'photo',
                bio: 'bio',
                listeners: 0,
                countryId: 1,
                createdAt: new Date(),
            },
            {
                id: 2,
                name: 'artist2',
                photo: 'photo',
                bio: 'bio',
                listeners: 0,
                countryId: 1,
                createdAt: new Date(),
            }
        ]);

        const artists = await artistService.getArtists();

        expect(artists[0].name).toEqual('artist');
        expect(artists[1].name).toEqual('artist2');
    });
});

describe('getArtistbyId', () => {
    test('Deve retornar um artista pelo id', async () => {
        prismaMock.artist.findUnique.mockResolvedValue({
            id: 1,
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
            createdAt: new Date(),
        });

        await expect(artistService.getArtistbyId(1)).resolves.toHaveProperty('name', 'artist');
    });

    test('Deve lançar um erro se o id não for informado', async () => {
        await expect(artistService.getArtistbyId(undefined as unknown as number)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.findUnique).not.toHaveBeenCalled();
    });
    
    test('Deve lançar um erro se o id não for um número', async () => {
        await expect(artistService.getArtistbyId(NaN)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.findUnique).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o artista não for encontrado', async () => {
        prismaMock.artist.findUnique.mockResolvedValue(null);

        await expect(artistService.getArtistbyId(1)).rejects.toThrow();
        await expect(prisma.artist.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { country: true },
        });
    });
});

describe('getArtistbyName', () => {
    test('Deve retornar um artista pelo nome', async () => {
        prismaMock.artist.findFirst.mockResolvedValue({
            id: 1,
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
            createdAt: new Date(),
        });

        await expect(artistService.getArtistbyName('artist')).resolves.toHaveProperty('name', 'artist');
    });

    test('Deve lançar um erro se o nome não for informado', async () => {
        await expect(artistService.getArtistbyName(undefined as unknown as string)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.findFirst).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o artista não for encontrado', async () => {
        prismaMock.artist.findFirst.mockResolvedValue(null);

        await expect(artistService.getArtistbyName('artist')).rejects.toThrow();
        await expect(prisma.artist.findFirst).toHaveBeenCalledWith({
            where: { name: { equals: 'artist' } },
            include: { country: true },
        });
    });
});

describe('getArtistbyCountry', () => {
    test('Deve retornar uma lista de artistas pelo país', async () => {
        jest.spyOn(CountryService, 'createCountry').mockResolvedValue({
            id: 1,
            name: 'country',
            continent: 'continent',
        });

        jest.spyOn(CountryService, 'getCountrybyName').mockResolvedValue({
            id: 1,
            name: 'country',
            continent: 'continent',
        });

        prismaMock.artist.findMany.mockResolvedValue([
            {
                id: 1,
                name: 'artist',
                photo: 'photo',
                bio: 'bio',
                listeners: 0,
                countryId: 1,
                createdAt: new Date(),
            }
        ]);

        await expect(artistService.getArtistsbyCountry('country')).resolves.toEqual([
            expect.objectContaining({ name: 'artist' })
        ]);
    });

    test('Deve lançar um erro se o país não for informado', async () => {
        await expect(artistService.getArtistsbyCountry(undefined as unknown as string)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.findMany).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o país não for encontrado', async () => {
        jest.spyOn(CountryService, 'getCountrybyName').mockRejectedValue(new Error());

        await expect(artistService.getArtistsbyCountry('country')).rejects.toThrow();
        await expect(prisma.artist.findMany).not.toHaveBeenCalled();
    });
});
describe('updateArtist', () => {
    test('Deve atualizar um artista', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockResolvedValue({
            id: 1,
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            country: {
                id: 1,
                name: 'country',
                continent: 'continent'
            },
            countryId: 1,
            createdAt: new Date(),
        });

        const artistUpdateData = {
            id: 1,
            name: 'updated artist',
            photo: 'updated photo',
            bio: 'updated bio',
            listeners: 10,
            countryId: 1,
            createdAt: new Date(),
        };

        prismaMock.artist.update.mockResolvedValue(artistUpdateData)

        await expect(artistService.updateArtist(1, artistUpdateData)).resolves.toHaveProperty('name', 'updated artist');
    });

    test('Deve lançar um erro se o id não for informado', async () => {
        await expect(artistService.updateArtist(undefined as unknown as number, {} as Artist)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.update).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o id não for um número', async () => {
        await expect(artistService.updateArtist(NaN, {} as Artist)).rejects.toThrow(InvalidParamError);
        await expect(prisma.artist.update).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o artista não for encontrado', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockRejectedValue(new NotFoundError('Artist not found'));

        await expect(artistService.updateArtist(1, {} as Artist)).rejects.toThrow(NotFoundError);
        expect(prisma.artist.update).not.toHaveBeenCalled();
    });
});
describe('deleteArtist', () => {
    test('Deve deletar um artista', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockResolvedValue({
            id: 1,
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            country: {
                id: 1,
                name: 'country',
                continent: 'continent'
            },
            countryId: 1,
            createdAt: new Date(),
        });

        prismaMock.artist.delete.mockResolvedValue({
            id: 1,
            name: 'artist',
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
            createdAt: new Date(),
        });

        await expect(artistService.deleteArtist(1)).resolves.toHaveProperty('name', 'artist');
    });

    test('Deve lançar um erro se o id não for informado', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockRejectedValue(new InvalidParamError('Insira um id válido!'));

        await expect(artistService.deleteArtist(undefined as unknown as number)).rejects.toThrow(InvalidParamError);
        expect(prisma.artist.delete).not.toHaveBeenCalled();    
    });

    test('Deve lançar um erro se o id não for um número', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockRejectedValue(new InvalidParamError('Insira um id válido!'));

        await expect(artistService.deleteArtist(NaN)).rejects.toThrow(InvalidParamError);
        expect(prisma.artist.delete).not.toHaveBeenCalled();
    });

    test('Deve lançar um erro se o artista não for encontrado', async () => {
        jest.spyOn(artistService, 'getArtistbyId').mockRejectedValue(new NotFoundError('Artist not found'));

        await expect(artistService.deleteArtist(1)).rejects.toThrow(NotFoundError);
        expect(prisma.artist.delete).not.toHaveBeenCalled();
    });
});