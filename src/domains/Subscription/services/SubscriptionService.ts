import { SubscriptionType } from "@prisma/client";
import prisma from "../../../../config/client";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { NotFoundError } from "../../../../errors/NotFoundError";

class SubscriptionService {
    async createSubscription(userId: number, type: SubscriptionType, duration: number) {
        if (userId == null || isNaN(userId)) {
            throw new InvalidParamError("ID do usuário inválido");
        }

        if (duration == null || isNaN(duration)) {
            throw new InvalidParamError("Insira a duração da assinatura em meses");
        }

        if (type == null) {
            throw new InvalidParamError("Tipo de assinatura inválido");
        }

        return await prisma.subscription.create({
            data: {
                userId,
                type,
                duration,
            },
        });
    }

    async getAllSubscriptions() {
        const subscriptions = await prisma.subscription.findMany({
            include: {
                payments: {
                    include: {
                        user: { omit: { password: true } }
                    }
                }
            },
        });

        if (!subscriptions.length) {
            throw new NotFoundError("Nenhuma assinatura encontrada");
        }

        return subscriptions;
    }

    async getSubscriptionByUserId(userId: number) {
        if (userId == null || isNaN(userId)) {
            throw new InvalidParamError("ID do usuário inválido");
        }

        const subscription = await prisma.subscription.findUnique({
            where: { userId },
            include: {
                payments: {
                    include: {
                        user: { omit: { password: true } }
                    }
                }
            },
        });

        if (!subscription) {
            throw new NotFoundError("Nenhuma assinatura encontrada");
        }

        return subscription;
    }

    async updateSubscription(userId: number, type: SubscriptionType, duration: number) {
        await this.getSubscriptionByUserId(userId);

        if (duration == null || isNaN(duration)) {
            throw new InvalidParamError("Insira a duração da assinatura em meses");
        }

        if (type == null) {
            throw new InvalidParamError("Tipo de assinatura inválido");
        }

        return await prisma.subscription.update({
            where: { userId },
            data: { type, duration },
        });
    }

    async cancelSubscription(userId: number) {
        await this.getSubscriptionByUserId(userId);

        return await prisma.subscription.delete({
            where: { userId },
        }); 
    }
}

export default new SubscriptionService();