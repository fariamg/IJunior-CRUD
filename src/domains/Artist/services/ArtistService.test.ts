import { Artist } from '@prisma/client';
import test, { describe } from 'node:test';
import { prismaMock } from '../../../../config/singleton';
import artistService from './ArtistService';

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
            name:undefined as unknown as string,
            photo: 'photo',
            bio: 'bio',
            listeners: 0,
            countryId: 1,
        };

        await expect(artistService.createArtist(artist)).rejects.toThrowError('Nome do artista não informado!');
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