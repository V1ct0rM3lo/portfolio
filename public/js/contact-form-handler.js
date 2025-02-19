const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para permitir requisições de outros domínios

const app = express();
const port = 3000;

// Usar o middleware para lidar com os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Permite requisições de outros domínios

// Configuração do transportador do Nodemailer (aqui usamos Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro serviço de sua preferência
    auth: {
        user: 'victosilvamelo13123@gmail.com',  // Substitua com seu e-mail
        pass: 'coeb ijvf lrux cnkf'  // Substitua com sua senha de app
    }
});

// Rota para processar o envio do formulário
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configuração do e-mail
    const mailOptions = {
        from: email,  // E-mail de envio (o que o usuário digitar no formulário)
        to: 'victorsilvamelo13123@gmail.com',  // E-mail de destino (pode ser o seu ou outro)
        subject: `Mensagem de ${name} pelo formulário de contato`,
        text: `
            Nome: ${name}
            E-mail: ${email}
            Telefone: ${phone}
            Mensagem: ${message}
        `,
        html: `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Mensagem:</strong><br>${message}</p>
        `
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar e-mail: ' + error.message);
        }
        res.status(200).send('E-mail enviado com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
