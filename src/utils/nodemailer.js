import { createTransport } from "nodemailer";

import { MAIL, PASS_MAIL } from '../../config/index.js'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: MAIL,
        pass: PASS_MAIL,
    }
});

const sendMail = async (data) => {
    const emailContent = {
        from: MAIL,
        to: MAIL,
        subject: "Frenos Avenida | Nuevo mensaje",
        html: `<h1'>Nuevo mensaje de: ${data.name}</h1>
                <ul>
                    <li>Nombre: ${data.name}</li>
                    <li>Email: ${data.mail}</li>
                </ul>
                <p>MENSAJE: ${data.message}</p>
            `,
    };
    console.log(emailContent)
    try {
        await transporter.sendMail(emailContent);
    } catch (error) {
        return { error: 'Hubo un error inesperado' }
    }
}

export { sendMail };