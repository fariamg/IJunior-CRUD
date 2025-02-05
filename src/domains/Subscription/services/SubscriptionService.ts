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
            console.error("Erro ao criar assinatura:", error);
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
            console.error("Erro ao buscar assinatura:", error);
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
            console.error("Erro ao atualizar assinatura:", error);
            throw new Error("Erro ao atualizar assinatura");
        }
    }

    async cancelSubscription(userId: number) {
        try {
            return await prisma.subscription.delete({
                where: { userId },
            });
        } catch (error) {
            console.error("Erro ao cancelar assinatura:", error);
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
            console.error("Erro ao adicionar pagamento:", error);
            throw new Error("Erro ao adicionar pagamento");
        }
    }
}

export default new SubscriptionService();
