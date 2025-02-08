import { Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";


const router = Router();


// ROTAS PARA LEITURA (GET) //
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);

    } catch (error) {
        next(error);
    }
    
});

router.get("/id/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserbyId(Number(req.params.id));
        res.json(user);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/email/:email", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;  // Aqui pegamos o email da URL
        const user = await UserService.getUserbyEmail(email);
        res.json(user);
    } catch (error) {
        next(error);
    }
});




// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/", async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { fullName, email, photo, password, role } = req.body;

        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos!" });
        }

        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { fullName, email, photo, password, role } = req.body;
        const { id } = req.params; 

        // Passando tanto o id quanto o body para o método updateUser
        const user = await UserService.updateUser(Number(id), req.body);

        res.status(200).json(user); // Use o status 200 para sucesso na atualização
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {

        const { id } = req.params; 

    
        const user = await UserService.deleteUser(Number(id));

        res.status(200).json({
            message: `Usuário com ID ${id} deletado com sucesso!`,
            
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;