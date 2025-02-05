import { Payment, Status } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class PaymentService {
    async createPayment(userId: number, amount: number, status: Status, subscriptionId?: number) {
        try {
            return await prisma.payment.create({
                data: {
                    userId,
                    amount,
                    status,
                    subscriptionId,
                },
            });
        } catch (error) {
            throw new Error("Erro ao criar pagamento");
        }
    }

    async getPaymentsByUserId(userId: number) {
        try {
            return await prisma.payment.findMany({
                where: { userId },
                include: { subscription: true },
            });
        } catch (error) {
            throw new Error("Erro ao buscar pagamentos");
        }
    }

    async getPaymentById(paymentId: number) {
        try {
            return await prisma.payment.findUnique({
                where: { id: paymentId },
                include: { user: true, subscription: true },
            });
        } catch (error) {
            throw new Error("Erro ao buscar pagamento");
        }
    }

    async updatePaymentStatus(paymentId: number, status: Status) {
        try {
            return await prisma.payment.update({
                where: { id: paymentId },
                data: { status },
            });
        } catch (error) {
            throw new Error("Erro ao atualizar status do pagamento");
        }
    }

    async deletePayment(paymentId: number) {
        try {
            return await prisma.payment.delete({
                where: { id: paymentId },
            });
        } catch (error) {
            throw new Error("Erro ao excluir pagamento");
        }
    }
}

export default new PaymentService();
