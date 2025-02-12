import { Router, Request, Response, NextFunction } from "express";
import SubscriptionService from "../services/SubscriptionService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from '../../../../utils/constants/userRoles';

const router = Router();

// ROTA PARA OBTER TODAS AS ASSINATURAS
router.get("/", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await SubscriptionService.getAllSubscriptions();
        res.status(statusCodes.SUCCESS).json(subscriptions);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA ASSINATURA PELO ID DO USUÁRIO
router.get("/user/:userId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.getSubscriptionByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UMA NOVA ASSINATURA
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.createSubscription(req.body.userId, req.body.type, req.body.duration);
        res.status(statusCodes.SUCCESS).json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UMA ASSINATURA
router.put("/", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.updateSubscription(req.body.userId, req.body.type, req.body.duration);
        res.status(statusCodes.SUCCESS).json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CANCELAR UMA ASSINATURA
router.delete("/:userId",  verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await SubscriptionService.cancelSubscription(Number(req.params.userId));
        res.status(statusCodes.NOT_FOUND).send();
    } catch (error) {
        next(error);
    }
});

export default router;