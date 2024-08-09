const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "botzimmariano@gmail.com",
    pass: "kwym vvtf kxrr bccu",
  },
});

async function sendEmail(emailUser, atleta) {
  // Enviar email com o objeto de transporte definido
  const info = await transporter.sendMail({
    from: "botzimmariano@gmail.com", // endereço do remetente
    to: emailUser, // destinatário
    subject: "Registro de novo atleta", // linha do assunto
    text: `Novo atleta registrado: ${JSON.stringify(atleta)}`, // corpo de texto simples
    html: `<b>Detalhes do atleta:</b><br>${JSON.stringify(atleta)}`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendEmail
};