import { Router , Request, Response, NextFunction} from "express";
import MusicService from "../services/MusicService";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await MusicService.getMusics();
        res.json(musics);

    } catch (error) {
        next(error);
    }
});

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyId(Number(req.params.id));
        res.json(music);
        
    } catch (error) {
        next(error);
        
    }
})
router.get("/:name", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const music = await MusicService.getMusicbyName(req.params.name);
        res.json(music);
        
    } catch (error) {
        next(error);
        
    }
})


// TODO: adicionar função de filtrar por países 
export default router;