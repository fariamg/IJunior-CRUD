import { Router , Request, Response, NextFunction} from "express";
import MusicService from "../services/MusicService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";


const router = Router();

// ROTAS PARA LEITURA
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getMusics();
        res.status(statusCodes.SUCCESS).json(musics);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyJWT ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(music);
    } catch (error) {
        next(error);
        
    }
})
router.get("/name/:name", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyName(req.params.name);
        res.status(statusCodes.SUCCESS).json(music);
    } catch (error) {
        next(error);
        
    }
})

router.get("/artist/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getMusicsbyArtist(req.body.id);
        res.status(statusCodes.SUCCESS).json(musics);
    } catch (error) {
        next(error);
        
    }
})


// ROTA PARA CRIAR OBJETO
router.post("/", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.createMusic(req.body, req.body.artistIds);
        res.status(statusCodes.CREATED).json(music);
    } catch (error) {
        next(error);
    }
});

//ROTA PARA ATUALIZAR OBJETO MUSICA
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.updateMusic(req.body.id, req.body);

        res.status(statusCodes.SUCCESS).json(music); 
    } catch (error) {
        next(error);
    }
});

//ROTA PARA DELETAR OBJETO MUSICA
router.delete("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await MusicService.deleteMusic(Number(id));
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});

export default router;