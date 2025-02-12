import { Router, Request, Response, NextFunction } from "express";
import CountryService from "../services/CountryService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";

const router = Router();

// ROTA PARA LISTAR TODOS OS PAÍSES
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await CountryService.getCountries();
        res.status(statusCodes.SUCCESS).json(countries);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM PAÍS POR ID
router.get("/id/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.getCountrybyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM PAÍS POR NOME
router.get("/name/:name", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.getCountrybyName(req.params.name);
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM NOVO PAÍS
router.post("/", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.createCountry(req.body);
        res.status(statusCodes.CREATED).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM PAÍS EXISTENTE
router.put("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = await CountryService.updateCountry(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(country);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA EXCLUIR UM PAÍS
router.delete("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedCountry = await CountryService.deleteCountry(Number(req.params.id));
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});

export default router;