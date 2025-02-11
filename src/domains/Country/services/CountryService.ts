import { Country } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

class CountryService {

    async createCountry(body: Country) {
        if (body.name == null) {
            throw new Error("Nome do país não informado!");
        }

        if (body.continent == null) {
            throw new Error("Continente do país não informado!");
        }

        const country = await prisma.country.create({
            data: {
                name: body.name,
                continent: body.continent,
            }
        });
        return country
    }

    async getCountries() {
        const countries = await prisma.country.findMany({ 
            orderBy: { name: 'asc' },
        });

        if (!countries) {
            throw new QueryError(`Nenhum país encontrado`);
        }

        return countries;
    }

    async getCountrybyId(id: number) {
        if (!id) {
            throw new InvalidParamError(`Id não informado`);
        }
        
        const country = await prisma.country.findUnique({
            where: { id },
        });

        if (!country) {
            throw new QueryError(`País com id ${id} não encontrado`);
        }

        return country;
    }

    async getCountrybyName(name: string) {
        if (!name) {
            throw new InvalidParamError(`Nome do país não informado`);
        }

        const country = await prisma.country.findFirst({
            where: { name: name },
        });

        if (!country) {
            throw new QueryError(`Nome  ${name} não encontrado`);
        }

        return country;
    }

    async updateCountry(id: number, body: Country) {
        if (!id) {
            throw new InvalidParamError(`Id não informado`);
        }

        const country = await this.getCountrybyId(id);

        const updatedCountry = await prisma.country.update({
            data: {
                name: body.name,
                continent: body.continent,
            },
            where: {
                id: id
            }
        });
        return updatedCountry;
    }

    async deleteCountry(wantedId: number) {
        const country = await this.getCountrybyId(wantedId);
        if (country) {
            await prisma.country.delete({
                where: { id: wantedId }
            });
        }
    }
}

export default new CountryService();