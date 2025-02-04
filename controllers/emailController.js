const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Enviar un correo electrónico
 *     description: Envia un correo electrónico a una dirección específica.
 *     parameters:
 *       - in: body
 *         name: emailData
 *         description: Datos del correo a enviar.
 *         schema:
 *           type: object
 *           required:
 *             - to
 *             - subject
 *             - text
 *           properties:
 *             to:
 *               type: string
 *               example: "ejemplo@email.com"
 *             subject:
 *               type: string
 *               example: "Asunto del correo"
 *             text:
 *               type: string
 *               example: "Este es el contenido del correo"
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente.
 *       500:
 *         description: Error al enviar el correo.
 */
const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // Puedes cambiarlo por otro servicio como Outlook o SMTP personalizado
      auth: {
        user: process.env.EMAIL_USER, // Definido en .env
        pass: process.env.EMAIL_PASS, // Definido en .env
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: ", info.response);

    res.status(200).json({ message: "Correo enviado correctamente", info });
  } catch (error) {
    console.error("Error al enviar correo: ", error);
    res
      .status(500)
      .json({ error: "Error al enviar correo", details: error.message });
  }
};

module.exports = { sendEmail };
