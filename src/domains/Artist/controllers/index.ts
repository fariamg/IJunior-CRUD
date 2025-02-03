import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService"; // O caminho pode variar dependendo da sua estrutura

const router = Router();



// ROTAS PARA LEITURA (GET) //
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await ArtistService.getArtists();
        res.json(users);

    } catch (error) {
        next(error);
    }
    
});

router.get("/id/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await ArtistService.getArtistbyId(Number(req.params.id));
        res.json(user);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/name/:name" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await ArtistService.getArtistbyName(req.params.name);
        res.json(user);
    } catch (error) {
        next(error)
    }
});





// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/create", async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, photo, bio, listeners } = req.body;

        if (!name || !listeners) {
            return res.status(400).json({ message: "Nome e ouvintes são obrigatórios!" });
        }

        const user = await ArtistService.createArtist(req.body); // Passando req.body diretamente

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/update/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { fullName, email, photo, password, role } = req.body;
        const { id } = req.params; 

        // Passando tanto o id quanto o body para o método updateUser
        const user = await ArtistService.updateArtist(Number(id), req.body);

        res.status(200).json(user); // Use o status 200 para sucesso na atualização
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", async function createUser(req: Request, res: Response, next: NextFunction) {
    
    try {

        const { id } = req.params; 

    
        const user = await ArtistService.deleteArtist(Number(id));

        res.status(200).json({
            message: `Artista com ID ${id} deletado com sucesso!`,
            
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;
