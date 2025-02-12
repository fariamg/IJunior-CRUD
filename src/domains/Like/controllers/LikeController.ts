import { Router, Request, Response, NextFunction } from "express";
import LikeService from "../services/LikeService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { verifyJWT, checkRole } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";

const router = Router();

// ROTA PARA LISTAR TODOS OS LIKES
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikes();
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER LIKES POR ID DE USUÁRIO
router.get("/user/:userId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikesByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA LISTAR LIKES POR ID DE MÚSICA
router.get("/music/:musicId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const likes = await LikeService.getLikesByMusicId(Number(req.params.musicId));
        res.status(statusCodes.SUCCESS).json(likes);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM NOVO LIKE
router.post("/", verifyJWT, checkRole([userRoles.USER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const like = await LikeService.createLike(req.body.userId, req.body.musicId);
        res.status(statusCodes.CREATED).json(like);;
    } catch (error) {
        next(error);
    }
});

// ROTA PARA DELETAR UM LIKE
router.delete("/:userId/:musicId", verifyJWT, checkRole([userRoles.USER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await LikeService.deleteLike(Number(req.params.userId), Number(req.params.musicId));
        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});


export default router;