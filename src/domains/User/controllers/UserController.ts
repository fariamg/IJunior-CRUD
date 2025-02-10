import { Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";

const router = Router();

router.post("/login", login);
router.post("/logout", verifyJWT, checkRole([userRoles.ADMIN, userRoles.USER]), logout);
// router.post("/logout", verifyJWT, logout)


// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/", async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});



// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/:id", verifyJWT, async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
         // Passando tanto o id quanto o body para o método updateUser
        const user = await UserService.updateUser(Number(req.body.id), req.body);

        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});



router.delete("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        
        await UserService.deleteUser(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json({
            message: `Usuário com ID ${req.params.id} deletado com sucesso!`,
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;