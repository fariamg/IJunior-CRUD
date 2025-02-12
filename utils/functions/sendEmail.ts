import { transporter } from './transportEmail';

export const sendEmail = async (info: { email: string; token: string }) => {
    await transporter.sendMail({
        from: process.env.EMAIL_ACCOUNT,
        to: info.email,
        subject: "Recuperação de senha - Código de verificação",
        text: `Olá,

Recebemos uma solicitação para redefinir sua senha. Utilize o código abaixo para continuar o processo:

Código de recuperação: ${info.token}

Se você não solicitou essa recuperação, ignore este email.

Atenciosamente`,

        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #007bff;">Recuperação de Senha</h2>
                <p>Olá,</p>
                <p>Recebemos uma solicitação para redefinir sua senha. Utilize o código abaixo para continuar o processo:</p>
                <div style="font-size: 20px; font-weight: bold; background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 5px;">
                    ${info.token}
                </div>
                <p>Se você não solicitou essa recuperação, ignore este email.</p>
            </div>
        `,
    
    });
};
