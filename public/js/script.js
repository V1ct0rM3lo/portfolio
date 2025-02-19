document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Coletando os dados do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Enviando os dados para o servidor usando Fetch
    const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, message })
    });

    const result = await response.json();
    document.getElementById("status").innerText = result.message; // Exibindo mensagem de status
});


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const data = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // Enviar os dados para o servidor
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(responseText => {
        alert('Mensagem enviada com sucesso!');
        console.log(responseText);
    })
    .catch(error => {
        alert('Erro ao enviar mensagem.');
        console.error(error);
    });
});
