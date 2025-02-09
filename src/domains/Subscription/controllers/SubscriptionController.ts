import { Router, Request, Response, NextFunction } from "express";
import SubscriptionService from "../services/SubscriptionService";

const router = Router();

// ROTA PARA OBTER TODAS AS ASSINATURAS
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptions = await SubscriptionService.getAllSubscriptions();
        res.json(subscriptions);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA ASSINATURA PELO ID DO USUÁRIO
router.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.getSubscriptionByUserId(Number(req.params.userId));
        res.json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UMA NOVA ASSINATURA
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.createSubscription(req.body.userId, req.body.type, req.body.duration);
        res.status(201).json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UMA ASSINATURA
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscription = await SubscriptionService.updateSubscription(req.body.userId, req.body.type, req.body.duration);
        res.json(subscription);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CANCELAR UMA ASSINATURA
router.delete("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await SubscriptionService.cancelSubscription(Number(req.params.userId));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;