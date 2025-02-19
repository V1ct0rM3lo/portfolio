document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    // Coletando os dados do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const data = { name, email, phone, message };

    try {
        // Enviando os dados para o servidor usando Fetch
        const response = await fetch("https://portfolio-uwz6.onrender.com/enviar-mensagem", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let result;
        if (response.ok) {
            try {
                result = await response.json();
            } catch (error) {
                result = await response.text();  
            }
            
            if (result.message) {
                alert("Mensagem enviada com sucesso!");
            } else {
                alert("Erro ao enviar mensagem: " + result);
            }
        } else {
            const errorMessage = await response.text();
            alert("Erro ao enviar mensagem: " + errorMessage);
        }

    } catch (error) {
        alert("Erro ao conectar com o servidor.");
        console.error("Erro ao enviar mensagem:", error);
    }
});
