const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const imageBtn = document.getElementById("image-btn");

function addMessage(content, isUser = false, isImage = false) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    
    if(isImage) {
        const img = document.createElement("img");
        img.src = content;
        img.className = "generated-image";
        img.loading = "lazy";
        message.appendChild(img);
    } else {
        message.innerHTML = formatMessage(content);
        addCopyButtons(message);
    }
    
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function formatMessage(text) {
    return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre data-lang="${lang || 'code'}"><code>${code.trim()}</code></pre>`;
    });
}

function addCopyButtons(element) {
    element.querySelectorAll('pre').forEach(pre => {
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.innerHTML = "📋";
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(pre.querySelector('code').textContent);
            copyBtn.innerHTML = "✅";
            setTimeout(() => copyBtn.innerHTML = "📋", 2000);
        };
        pre.appendChild(copyBtn);
    });
}

async function handleText(prompt) {
    try {
        const response = await puter.ai.chat(prompt);
        addMessage(response);
    } catch (error) {
        addMessage("⚠️ Error procesando tu solicitud");
    }
}

async function generateImage(prompt) {
    try {
        const imageUrl = await puter.ai.txt2img(prompt, true);
        addMessage(imageUrl, false, true);
    } catch (error) {
        addMessage("⚠️ Error generando la imagen");
    }
}

sendBtn.addEventListener("click", () => {
    const prompt = userInput.value.trim();
    if(prompt) {
        addMessage(prompt, true);
        handleText(prompt);
        userInput.value = "";
    }
});

imageBtn.addEventListener("click", () => {
    const prompt = userInput.value.trim();
    if(prompt) {
        addMessage(`Generando imagen: "${prompt}"`, true);
        generateImage(prompt);
        userInput.value = "";
    }
});

userInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendBtn.click();
});
