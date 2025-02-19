document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita recarregar a página

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const response = await fetch("https://portfolio-uwz6.onrender.com/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, message })
    });

    const status = document.getElementById("status");

    if (response.ok) {
        status.textContent = "Mensagem enviada com sucesso!";
        status.style.color = "green";
    } else {
        status.textContent = "Erro ao enviar mensagem. Tente novamente.";
        status.style.color = "red";
    }
});
