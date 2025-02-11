import { Router, Request, Response, NextFunction } from "express";
import LikeService from "../services/LikeService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

// ROTA PARA LISTAR TODOS OS LIKES
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikes();
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER LIKES POR ID DE USUÁRIO
router.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikesByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA LISTAR LIKES POR ID DE MÚSICA
router.get("/music/:musicId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikesByMusicId(Number(req.params.musicId));
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM NOVO LIKE
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const like = await LikeService.createLike(req.body.userId, req.body.musicId);
        res.status(statusCodes.CREATED).json(like);;
    } catch (error) {
        next(error);
    }
});

// ROTA PARA DELETAR UM LIKE
router.delete("/:userId/:musicId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LikeService.deleteLike(Number(req.params.userId), Number(req.params.musicId));
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});


export default router;