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


// describe('getArtists', () => {
// });

// describe('getArtistbyId', () => {
// });

// describe('getArtistbyName', () => {
// });

// describe('getArtistbyCoutnry', () => {
// });

// describe('updateArtist', () => {
// });

// describe('deleteArtist', () => {
// });