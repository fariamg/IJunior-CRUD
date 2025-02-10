import { Router, Request, Response, NextFunction} from "express";
import UserService from "../../User/services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";
import AdminServices from "../services/AdminServices";

const router = Router();



// ROTA PARA CRIAR UM USUÁRIO COM PERMISSAO DE ADMIN OU NÃO. (POST)
router.post("/create", async function createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await AdminServices.createAdmin(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});




// ROTAS PARA LEITURA DE USUARIOS(GET) //
router.get("/", verifyJWT, checkRole([userRoles.ADMIN]),  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await AdminServices.getUsers();
        res.status(statusCodes.SUCCESS).json(users);

    } catch (error) {
        next(error);
    }
    
});

router.get("/id/:id", verifyJWT, checkRole([userRoles.ADMIN]), async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await AdminServices.getUserbyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(user);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/email/:email", verifyJWT,  checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;  // Aqui pegamos o email da URL
        const user = await AdminServices.getUserbyEmail(email);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});



// ROTA PARA ATUALIZAR QUALQUER USUÁRIO (PUT) 
router.put("/:id", verifyJWT,checkRole([userRoles.ADMIN]), async function updateUser(req: Request, res: Response, next: NextFunction) {
    
    try {
         // Passando tanto o id quanto o body para o método updateUser
        const user = await AdminServices.updateUser(Number(req.params.id), req.body);

        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        await AdminServices.deleteUser(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json({
            message: `Usuário com ID ${req.params.id} deletado com sucesso!`,
        });
    } catch (error) {
        next(error);
    }
});




export default router;