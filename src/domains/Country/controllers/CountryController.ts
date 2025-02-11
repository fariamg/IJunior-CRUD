import { Router, Request, Response, NextFunction } from "express";
import CountryService from "../services/CountryService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

// ROTA PARA LISTAR TODOS OS PAÍSES
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await CountryService.getCountries();
        res.status(statusCodes.SUCCESS).json(countries);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM PAÍS POR ID
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.getCountrybyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM PAÍS POR NOME
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.getCountrybyName(req.params.name);
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM NOVO PAÍS
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.createCountry(req.body);
        res.status(statusCodes.CREATED).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM PAÍS EXISTENTE
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.updateCountry(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA EXCLUIR UM PAÍS
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedCountry = await CountryService.deleteCountry(Number(req.params.id));
        res.status(statusCodes.NO_CONTENT);
    } catch (error) {
        next(error);
    }
});

export default router;