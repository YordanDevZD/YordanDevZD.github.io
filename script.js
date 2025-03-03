// Elementos del DOM
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Función para agregar mensajes al chat
function addMessageToChat(message, isUser = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user" : "bot");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}

// Función para enviar mensajes a Puter.js
async function sendMessageToPuter(message) {
    try {
        const response = await puter.ai.chat(message);
        addMessageToChat(response, false); // Respuesta del bot
    } catch (error) {
        addMessageToChat("Error al procesar tu mensaje.", false);
        console.error("Error:", error);
    }
}

// Evento para enviar mensajes
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
        addMessageToChat(message, true); // Mensaje del usuario
        userInput.value = ""; // Limpiar input
        sendMessageToPuter(message); // Enviar a Puter.js
    }
});

// Enviar mensaje al presionar Enter
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
