import { Country } from "@prisma/client";
import prisma from "../../../config/prismaClient";

class CountryService {

    async createCountry(body: Country) {
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
        return countries;
    }

    async getCountrybyId(id: number) {
        const country = await prisma.country.findUnique({
            where: { id },
        });

        if (!country) {
            throw new Error(`Id  ${id} não encontrado`);
        }

        return country;
    }

    async getCountrybyName(name: string) {
        const country = await prisma.country.findFirst({
            where: { name: name },
        });

        if (!country) {
            throw new Error(`Nome  ${name} não encontrado`);
        }

        return country;
    }

    async updateCountry(id: number, body: Country) {
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

    async delleteAll() {
        const deletedCountries = await prisma.country.deleteMany();
        return deletedCountries;
    }
}

export default new CountryService();