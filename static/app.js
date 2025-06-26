const messagesDiv = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('message');

function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = `message ${cls}`;
    div.textContent = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage('Tú: ' + text, 'user');
    input.value = '';

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    });
    const data = await response.json();
    addMessage('Bot: ' + data.reply, 'bot');
});
