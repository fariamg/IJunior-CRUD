import { describe, test, expect } from '@jest/globals';
import { prismaMock } from '../../../../config/singleton';
import artistService from './ArtistService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import prisma from '../../../../config/client';

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

// describe('getArtistbyName', () => {
// });

// describe('getArtistbyCoutnry', () => {
// });

// describe('updateArtist', () => {
// });

// describe('deleteArtist', () => {
// });