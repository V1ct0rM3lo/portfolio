const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rota inicial para testar se o servidor está rodando
const path = require('path');

// Servindo arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para carregar a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuração do transportador do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para envio de e-mail
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Mensagem de ${name} pelo formulário`,
            text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`,
            html: `
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <p><strong>Mensagem:</strong><br>${message}</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).send('E-mail enviado: ' + info.response);
    } catch (error) {
        res.status(500).send('Erro ao enviar e-mail: ' + error.message);
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
