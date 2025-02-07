import { Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../../utils/constants/statusCodes";
import { login, verifyJWT } from "../../middlewares/auth";


const router = Router();

router.post("/login", login);
// router.post("/logout", verifyJWT, logout)

// ROTAS PARA LEITURA (GET) //
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUsers();
        res.status(statusCodes.SUCCESS).json(users);

    } catch (error) {
        next(error);
    }
    
});

router.get("/id/:id", verifyJWT, async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserbyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(user);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/email/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;  // Aqui pegamos o email da URL
        const user = await UserService.getUserbyEmail(email);
        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});




// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/create", async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        
        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/update/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
         // Passando tanto o id quanto o body para o método updateUser
        const user = await UserService.updateUser(Number(req.body.id), req.body);

        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
        
        await UserService.deleteUser(Number(req.body.id));
        res.status(statusCodes.SUCCESS).json({
            message: `Usuário com ID ${req.body.id} deletado com sucesso!`,
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;