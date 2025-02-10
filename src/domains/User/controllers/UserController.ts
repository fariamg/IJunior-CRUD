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
router.post("/", verifyJWT, checkRole([userRoles.ADMIN, userRoles.USER]), async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});



// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/update/:id", verifyJWT, checkRole([userRoles.ADMIN, userRoles.USER]), async function updateUser(req: Request, res: Response, next: NextFunction) {
    
    try {

        const loggedInUserId = req.user.id;
         // Passando tanto o id quanto o body para o método updateUser
        const user = await UserService.updateUser(Number(req.params.id), req.body, loggedInUserId);

        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", verifyJWT, checkRole([userRoles.ADMIN, userRoles.USER]), async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id;

        await UserService.deleteUser(Number(req.params.id), loggedInUserId);
        res.status(statusCodes.SUCCESS).json({
            message: `Usuário deletado com sucesso!`,
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;