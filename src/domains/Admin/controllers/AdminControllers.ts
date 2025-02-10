import { Router, Request, Response, NextFunction} from "express";
import UserService from "../../User/services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";

const router = Router();



// ROTA PARA CRIAR UM USUÁRIO COM PERMISSAO DE ADMIN OU NÃO. (POST)
router.post("/", async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});









export default router;