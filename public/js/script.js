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
        const response = await fetch("https://portfolio-df2p.onrender.com/send-email", {  // Troque localhost pela URL do seu servidor no Render
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Verifica se a resposta é JSON ou texto simples
        let result;
        if (response.ok) {
            // Tenta obter a resposta como JSON
            try {
                result = await response.json();
            } catch (error) {
                result = await response.text();  // Se não for JSON, tenta como texto
            }
            
            // Se for JSON, mostra a mensagem de sucesso ou erro
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
        // Em caso de erro ao conectar com o servidor
        alert("Erro ao conectar com o servidor.");
        console.error("Erro:", error);
    }
});
