const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` para porta 465, `false` para todas as outras portas
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

async function sendEmail(emailUser, atleta) {
  // Enviar email com o objeto de transporte definido
  const info = await transporter.sendMail({
    from: '"Info Atletas 🥇" <maddison53@ethereal.email>', // endereço do remetente
    to: `${emailUser}`, // destinatário
    subject: "Registro de novo atleta", // linha do assunto
    text: `Novo atleta registrado: ${JSON.stringify(atleta)}`, // corpo de texto simples
    html: `<b>Novo atleta registrado:</b><pre>${JSON.stringify(atleta, null, 2)}</pre>`, // corpo em HTML
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendEmail
};

