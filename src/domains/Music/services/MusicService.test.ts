import { describe, test, expect } from '@jest/globals';
import { prismaMock } from '../../../../config/singleton';
import musicService from './MusicService';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { NotFoundError } from '../../../../errors/NotFoundError';
import prisma from '../../../../config/client';


describe('createMusic', () => {
    test('Deve criar uma nova música', async () => {
        const music = {
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
        };

        prismaMock.music.create.mockResolvedValue({
            id: 1,
            createdAt: new Date(),
            ...music,
        });

        const createdMusic = await musicService.createMusic(music, [1]);

        expect(createdMusic.name).toEqual(music.name);
    });

    test('Deve lançar um erro se o nome da música não for informado', async () => {
        const music = {
            name: null as any,
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
        };

        await expect(musicService.createMusic(music, [1])).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o ID dos artistas não for informado', async () => {
        const music = {
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
        };

        await expect(musicService.createMusic(music, null as any)).rejects.toThrow(InvalidParamError);
    });
});

describe('getMusics', () => {
    test('Deve retornar uma lista de músicas', async () => {
        prismaMock.music.findMany.mockResolvedValue([
            {
                id: 1,
                name: 'music',
                duration: 180,
                recordDate: new Date(),
                playCount: 0,
                likeCount: 0,
                createdAt: new Date(),
            },
        ]);

        await expect(musicService.getMusics()).resolves.toHaveLength(1);
    });

    test('Deve lançar um erro se nenhuma música for encontrada', async () => {
        prismaMock.music.findMany.mockResolvedValue([]);
        await expect(musicService.getMusics()).rejects.toThrow(NotFoundError);
    });

    test('Deve retornar uma lista de músicas ordenadas pelo nome', async () => {
        prismaMock.music.findMany.mockResolvedValue([
            {
                id: 1,
                name: 'music1',
                duration: 180,
                recordDate: new Date(),
                playCount: 0,
                likeCount: 0,
                createdAt: new Date(),
            },
            {
                id: 2,
                name: 'music2',
                duration: 180,
                recordDate: new Date(),
                playCount: 0,
                likeCount: 0,
                createdAt: new Date(),
            },
        ]);

        const musics = await musicService.getMusics()
        
        expect(musics[0].name).toEqual('music1');
        expect(musics[1].name).toEqual('music2');
    });

    test('Deve lançar um erro se o Id não for informado', async () => {
        await expect(musicService.getMusicbyId(null as any)).rejects.toThrow(InvalidParamError);
        await expect(prisma.music.findUnique).not.toHaveBeenCalled();
    });
});

describe('getMusicbyId', () => {
    test('Deve retornar uma música pelo ID', async () => {
        prismaMock.music.findUnique.mockResolvedValue({
            id: 1,
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
            createdAt: new Date(),
        });

        await expect(musicService.getMusicbyId(1)).resolves.toHaveProperty('name', 'music');
    });

    test('Deve lançar um erro se o ID não for informado', async () => {
        await expect(musicService.getMusicbyId(null as any)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se a música não for encontrada', async () => {
        prismaMock.music.findUnique.mockResolvedValue(null);
    });
});
describe('updateMusic', () => {
    test('Deve atualizar uma música', async () => {
        jest.spyOn(musicService, 'getMusicbyId').mockResolvedValue({
            id: 1,
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
            createdAt: new Date(),
        });

        const updatedMusic = {
            id: 1,
            name: 'updated music',
            duration: 200,
            recordDate: new Date(),
            playCount: 10,
            likeCount: 5,
            createdAt: new Date(),
        };

        prismaMock.music.update.mockResolvedValue(updatedMusic);

        await expect(musicService.updateMusic(1, updatedMusic)).resolves.toHaveProperty('name', 'updated music');
    });
});

describe('deleteMusic', () => {
    test('Deve deletar uma música', async () => {
        jest.spyOn(musicService, 'getMusicbyId').mockResolvedValue({
            id: 1,
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
            createdAt: new Date(),
        });

        prismaMock.music.delete.mockResolvedValue({
            id: 1,
            name: 'music',
            duration: 180,
            recordDate: new Date(),
            playCount: 0,
            likeCount: 0,
            createdAt: new Date(),
        });

        await expect(musicService.deleteMusic(1)).resolves.toHaveProperty('name', 'music');
    });

    test('Deve lançar um erro se o ID não for informado', async () => {
        jest.spyOn(musicService, 'getMusicbyId').mockRejectedValue(new InvalidParamError('Invalid ID'));

        await expect(musicService.deleteMusic(null as any)).rejects.toThrow(InvalidParamError);
        expect(prisma.artist.delete).not.toHaveBeenCalled(); 
    });

    test('Deve lançar um erro se a música não for encontrada', async () => {
        jest.spyOn(musicService, 'getMusicbyId').mockRejectedValue(new NotFoundError('Music not found'));

        await expect(musicService.deleteMusic(1)).rejects.toThrow(NotFoundError);
        expect(prisma.artist.delete).not.toHaveBeenCalled();
    });
});

