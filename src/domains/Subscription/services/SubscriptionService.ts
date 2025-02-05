import { SubscriptionType, Status } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class SubscriptionService {
    async createSubscription(userId: number, type: SubscriptionType, duration: number) {
        try {
            return await prisma.subscription.create({
                data: {
                    userId,
                    type,
                    duration,
                },
            });
        } catch (error) {
            throw new Error("Erro ao criar assinatura");
        }
    }

    async getSubscriptionByUserId(userId: number) {
        try {
            return await prisma.subscription.findUnique({
                where: { userId },
                include: { payments: true },
            });
        } catch (error) {
            throw new Error("Erro ao buscar assinatura");
        }
    }

    async updateSubscription(userId: number, type: SubscriptionType, duration: number) {
        try {
            return await prisma.subscription.update({
                where: { userId },
                data: { type, duration },
            });
        } catch (error) {
            throw new Error("Erro ao atualizar assinatura");
        }
    }

    async cancelSubscription(userId: number) {
        try {
            return await prisma.subscription.delete({
                where: { userId },
            });
        } catch (error) {
            throw new Error("Erro ao cancelar assinatura");
        }
    }

    async addPayment(userId: number, amount: number, status: Status) {
        try {
            return await prisma.payment.create({
                data: {
                    userId,
                    amount,
                    status,
                },
            });
        } catch (error) {
            throw new Error("Erro ao adicionar pagamento");
        }
    }
}

export default new SubscriptionService();
