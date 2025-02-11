import { Router, Request, Response, NextFunction } from "express";
import PaymentService from "../services/PaymentService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

// ROTA PARA LISTAR TODOS OS PAGAMENTOS
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payments = await PaymentService.getPayments();
        res.status(statusCodes.SUCCESS).json(payments);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM PAGAMENTO POR ID
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payment = await PaymentService.getPaymentById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(payment);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER PAGAMENTOS DE CADA USUÁRIO POR ID
router.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payments = await PaymentService.getPaymentsByUserId(Number(req.params.userId));
        res.status(statusCodes.SUCCESS).json(payments);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM NOVO PAGAMENTO
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payment = await PaymentService.createPayment(req.body.userId, req.body.amount, req.body.status, req.body.subscriptionId);
        res.status(statusCodes.CREATED).json(payment);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR O STATUS DE UM PAGAMENTO
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payment = await PaymentService.updatePaymentStatus(Number(req.params.id), req.body.status);
        res.status(statusCodes.SUCCESS).json(payment);
    } catch (error) {
        next(error);
    }
});

export default router;