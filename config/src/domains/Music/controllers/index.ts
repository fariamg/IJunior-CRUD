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

// import MusicRouter from "../config/src/domains/Music/controllers/index"
export default router;