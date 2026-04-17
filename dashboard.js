
function toggleChat() {
  const chat = document.querySelector(".chat");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

async function sendMessage() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  const userText = input.value;

  if (!userText) return; // 👈 مهم جدًا

  messages.innerHTML += `<p>🧑‍🎓 أنت: ${userText}</p>`;

  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await res.json();

    // 👇 حماية لو الرد فاضي
    messages.innerHTML += `<p>🤖 AI: ${data.reply || "مفيش رد من السيرفر"}</p>`;

  } catch (error) {
    messages.innerHTML += `<p style="color:red">❌ السيرفر مش شغال</p>`;
  }
}
