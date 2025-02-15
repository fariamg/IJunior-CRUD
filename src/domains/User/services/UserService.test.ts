import { describe, test, expect } from '@jest/globals';
import { prismaMock } from '../../../../config/singleton';
import UserService from './UserService';
import prisma from '../../../../config/client';
import { Role } from '@prisma/client';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';

describe('createUser', () => {
    test('Deve criar um novo usuário', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.create.mockResolvedValue(user);

        const createdUser = await UserService.createUser(user);

        await expect(createdUser).toEqual(user);
    });

    test('Deve lançar um erro se o email do usuário não for informado', async () => {
        const user = {
            fullName: 'user',
            email: null as any,
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await expect(UserService.createUser(user)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se a senha do usuário não for informada', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: null as any,
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await expect(UserService.createUser(user)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o nome completo do usuário não for informado', async () => {
        const user = {
            fullName: null as any,
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await expect(UserService.createUser(user)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o formato do email do usuário for inválido', async () => {
        const user = {
            fullName: 'user',
            email: 'usergmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await expect(UserService.createUser(user)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o email do usuário já estiver cadastrado', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(UserService.createUser(user)).rejects.toThrow(QueryError);
    });
});

describe('getUsers', () => {
    test('Deve retornar uma lista de usuários', async () => {
        prismaMock.user.findMany.mockResolvedValue([
            {
                id: 1,
                fullName: 'user',
                email: 'user@gmai.com',
                photo:'photo',
                password: 'password',
                countryId: 1,
                createdAt: new Date(),
                isActive: true,
                role: Role.USER,
                updatedAt: new Date(),
            },
            {
                id: 2,
                fullName: 'user2',
                email: 'user2@gmai.com',
                photo:'photo2',
                password: 'password2',
                countryId: 1,
                createdAt: new Date(),
                isActive: true,
                role: Role.USER,
                updatedAt: new Date(),
            }
        ]);

        const users = await UserService.getUsers();

        expect(users).toHaveLength(2);
    });

    test('Deve lançar um erro se nenhum usuário for encontrado', async () => {
        prismaMock.user.findMany.mockResolvedValue([]);

        await expect(UserService.getUsers()).rejects.toThrow(QueryError);
    });

    test('Deve retornar uma lista de usuários ordenados pelo nome', async () => {
        prismaMock.user.findMany.mockResolvedValue([
            {
                id: 1,
                fullName: 'user1',
                email:'user@gmai.com',
                photo:'photo',
                password: 'password',
                countryId: 1,
                createdAt: new Date(),
                isActive: true,
                role: Role.USER,
                updatedAt: new Date(),
            },
            {
                id: 2,
                fullName: 'user2',
                email: 'user2@gmai.com',
                photo:'photo2',
                password: 'password2',
                countryId: 1,
                createdAt: new Date(),
                isActive: true,
                role: Role.USER,
                updatedAt: new Date(),
            }
        ]);
        const users = await UserService.getUsers();

        expect(users[0].fullName).toEqual('user1');
        expect(users[1].fullName).toEqual('user2');
    });

    test('Deve lançar um erro se o id do usuário não for informado', async () => {
        await expect(UserService.getUserMusics(null as any)).rejects.toThrow(InvalidParamError);
    });
});

describe('getUserbyEmail', () => {
    test('Deve retornar um usuário pelo email', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await prismaMock.user.findUnique.mockResolvedValue(user);
    });

    test('Deve lançar um erro se o usuário não for encontrado', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);
    });
})

describe('getUserbyId', () => {
    test('Deve retornar um usuário pelo ID', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await prismaMock.user.findUnique.mockResolvedValue(user);
    });

    test('Deve lançar um erro se o usuário não for encontrado', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);
    });
}) 

describe('getUserMusics', () => {
    test('Deve retornar as musicas escutadas por um usuario', () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockResolvedValue(user);
    });

    test('Deve lançar um erro se o id do usuário não for informado', async () => {
        await expect(UserService.getUserMusics(null as any)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o id do usuario não for um numero', async () => {
        await expect(UserService.getUserMusics(NaN)).rejects.toThrow(InvalidParamError);
    })

    test('Deve lançar um erro se o usuario não for encontrado', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(UserService.getUserMusics(1)).rejects.toThrow(QueryError);
    });
});

describe('updateUser', () => {
    test('Deve atualizar um usuário', async () => {
        jest.spyOn(UserService, 'getUserbyId').mockResolvedValue({
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            country: {
                id: 1,
                name: 'country',
                continent: 'continent',
            },
            listenedMusics: [],
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        });

        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }   

        prismaMock.user.update.mockResolvedValue(user);

        const updatedUser = await UserService.updateUser(1, user, 1);

        await expect(updatedUser).toEqual(user);
    });

    test('Deve lançar um erro se o id do usuario for diferente do id do usuario logado', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 2,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        await expect(UserService.updateUser(1, user, 2)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o id do usuario não for informado', async () => {
        const user = {
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: null as any,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockRejectedValue(new InvalidParamError('Invalid ID'));

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o email do usuario não for informado', async () => {
        const user = {
            fullName: 'user',
            email: null as any,
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockRejectedValue(new InvalidParamError('Invalid email'));

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o fullName do usuario não for informado', async () => {
        const user = {
            fullName: null as any,
            email: "user@gmail.com",
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockRejectedValue(new InvalidParamError('Invalid email'));

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o email do usuario for inválido', async () => {
        const user = {
            fullName: 'user',
            email: 'usergmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockRejectedValue(new InvalidParamError('Invalid email'));

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(InvalidParamError);
    });

    test('Deve lançar um erro se o usuario não for encontrado', async () => {
        const user = {
            fullName: null as any,
            email: "user@gmail.com",
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(QueryError);
    });

    test('Deve lançar um erro se o id do usuario não for um numero', async () => {
        const user = {
            fullName: null as any,
            email: "user@gmail.com",
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: NaN,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockRejectedValue(new InvalidParamError('Invalid ID'));

        await expect(UserService.updateUser(NaN, user, 1)).rejects.toThrow(InvalidParamError);
    });

    test ('Deve lançar um erro se o email a ser atualizado já estiver cadastrado', async () => {
        const user = {
            fullName: null as any,
            email: "user@gmail.com",
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: NaN,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        }

        prismaMock.user.findUnique.mockResolvedValue(user);

        await expect(UserService.updateUser(1, user, 1)).rejects.toThrow(InvalidParamError);
    });
});

describe('deleteUser', () => {
    test('Deve deletar um usuário', async () => {
        jest.spyOn(UserService, 'getUserbyId').mockResolvedValue({
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            country: {
                id: 1,
                name: 'country',
                continent: 'continent',
            },
            listenedMusics: [],
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        });

        prismaMock.user.delete.mockResolvedValue({
            fullName: 'user',
            email: 'user@gmail.com',
            photo:'photo',
            password: 'password',
            countryId: 1,
            id: 1,
            createdAt: new Date(),
            isActive: true,
            role: Role.USER,
            updatedAt: new Date(),
        });

        await expect(UserService.deleteUser(1, 1)).resolves.toHaveProperty('fullName', 'user');

    });
});