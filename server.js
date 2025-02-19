// Importa as dependências
const express = require('express');
const nodemailer = require('nodemailer');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');  // Importa o CORS

// Inicializa o Express
const app = express();

// Usa o CORS para permitir requisições de diferentes origens
app.use(cors());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Configura o body-parser para manipular JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura o transporte de e-mail (usando o Gmail, mas você pode usar outro provedor)
// Configura o transporte de e-mail (usando o Gmail, mas você pode usar outro provedor)
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Variáveis de ambiente para email e senha
        pass: process.env.EMAIL_PASS,
    },
});

// Serve o arquivo HTML na raiz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Substitua 'index.html' pelo nome do seu arquivo HTML
});

// Rota para processar o envio do formulário
app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configuração do e-mail
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_TO,  // Agora usando a variável EMAIL_TO do .env
        subject: `Mensagem de ${name} pelo formulário de contato`,
        text: `Você recebeu uma nova mensagem de ${name} (${email} - ${phone}):\n\n${message}`,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Telefone:</strong> ${phone}</p><p><strong>Mensagem:</strong><br>${message}</p>`,
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Erro ao enviar e-mail: ' + error.message);
        }
        res.status(200).send('E-mail enviado com sucesso!');
    });
});


// Inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
