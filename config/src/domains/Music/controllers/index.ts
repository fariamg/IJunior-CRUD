import { Router , Request, Response, NextFunction} from "express";
import MusicService from "../services/MusicService";

const router = Router();

// ROTAS PARA LEITURA
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getMusics();
        res.json(musics);

    } catch (error) {
        next(error);
    }
});

router.get("/id/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyId(Number(req.params.id));
        res.json(music);
        
    } catch (error) {
        next(error);
        
    }
})
router.get("/name/:name", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyName(req.params.name);
        res.json(music);
        
    } catch (error) {
        next(error);
        
    }
})


// ROTA PARA CRIAR OBJETO
router.post("/create", async function createMusic(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, duration, recordDate , artistIds } = req.body;
        
        if (!name ||!artistIds || !duration || !recordDate) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos!" });
        }

        const music = await MusicService.createMusic(req.body, req.body.artistIds);

        return res.status(201).json(music);
    } catch (error) {
        next(error);
    }
});

//ROTA PARA ATUALIZAR OBJETO MUSICA
router.put("/update/:id", async function createMusic(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { id } = req.params; 

        // Passando tanto o id quanto o body para o método updateUser
        const user = await MusicService.updateMusic(Number(id), req.body);

        res.status(200).json(user); // Use o status 200 para sucesso na atualização
    } catch (error) {
        next(error);
    }
});

//ROTA PARA DELETAR OBJETO MUSICA
router.delete("/delete/:id", async function createMusic(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { id } = req.params;  
        
        await MusicService.deleteMusic(Number(id));

        res.status(200).json({
            message: `Música com ID ${id} deletado com sucesso!`,
            
        }); 

    } catch (error) {
        next(error);
    }
});


// TODO: adicionar função de filtrar por países 
export default router;