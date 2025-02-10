import { Router , Request, Response, NextFunction} from "express";
import MusicService from "../services/MusicService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";


const router = Router();

// ROTAS PARA LEITURA
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getMusics();
        res.status(statusCodes.SUCCESS).json(musics);

    } catch (error) {
        next(error);
    }
});

router.get("/id/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(music);
        
    } catch (error) {
        next(error);
        
    }
})
router.get("/name/:name", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyName(req.params.name);
        res.status(statusCodes.SUCCESS).json(music);
        
    } catch (error) {
        next(error);
        
    }
})


// ROTA PARA CRIAR OBJETO
router.post("/", verifyJWT, checkRole([userRoles.ADMIN]), async function createMusic(req: Request, res: Response, next: NextFunction) {
    try {
        
        const music = await MusicService.createMusic(req.body, req.body.artistIds);
        res.status(statusCodes.CREATED).json(music);

    } catch (error) {
        next(error);
    }
});

//ROTA PARA ATUALIZAR OBJETO MUSICA
router.put("/:id", async function createMusic(req: Request, res: Response, next: NextFunction) {
    
    try {

        // Passando tanto o id quanto o body para o método updateUser
        const music = await MusicService.updateMusic(req.body.id, req.body);

        res.status(statusCodes.SUCCESS).json(music); // Use o status 200 para sucesso na atualização
    } catch (error) {
        next(error);
    }
});

//ROTA PARA DELETAR OBJETO MUSICA
router.delete("/:id", async function createMusic(req: Request, res: Response, next: NextFunction) {
    
    try {
        
        await MusicService.deleteMusic(req.body.Id);

        res.status(statusCodes.SUCCESS).json({
            message: `Música com ID ${req.body.id} deletado com sucesso!`,
        }); 

    } catch (error) {
        next(error);
    }
});

export default router;