import { Status } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { NotFoundError } from "../../../../errors/NotFoundError";

class PaymentService {
    async createPayment(userId: number, amount: number, status: Status, subscriptionId: number) {
        if (userId == null || isNaN(userId)) {
            throw new InvalidParamError("Insira um id de usuário válido");
        }

        if (amount == null || isNaN(amount)) {
            throw new InvalidParamError("Insira um valor válido");
        }

        if (subscriptionId == null || isNaN(subscriptionId)) {
            throw new InvalidParamError("Insira um id de assinatura válido");
        }

        return await prisma.payment.create({
            data: {
                userId,
                amount,
                status,
                subscriptionId,
            },
        });
    }

    async getPayments() {
        const payments = await prisma.payment.findMany({
            include: { 
                subscription: true,
                user:  { 
                    omit: { 
                        password: true }},
            },
        });

        if (!payments.length) {
            throw new NotFoundError("Nenhum pagamento encontrado");
        }

        throw new Error("Erro ao buscar pagamentos");
    }

    async getPaymentsByUserId(userId: number) {
        if (userId == null || isNaN(userId)) {
            throw new InvalidParamError("Insira um id de usuário válido");
        }

        const payments = await prisma.payment.findMany({
            where: { userId },
            include: { subscription: true },
        });

        if (!payments.length) {
            throw new NotFoundError("Nenhum pagamento encontrado");
        }
    }

    async getPaymentById(paymentId: number) {
        if (paymentId == null || isNaN(paymentId)) {
            throw new InvalidParamError("Insira um id de pagamento válido");
        }
        
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
            include: { 
                subscription: true, 
                user:  { 
                    omit: { 
                        password: true }},
            },
        });

        if (!payment) {
            throw new NotFoundError(`Pagamento com id ${paymentId} não encontrado`);
        }
    }

    async updatePaymentStatus(paymentId: number, status: Status) {
        await this.getPaymentById(paymentId);

        return await prisma.payment.update({
            where: { id: paymentId },
            data: { status },
        });
    }
}

export default new PaymentService();
