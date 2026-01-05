export async function askChatbot(question) {
  const response = await fetch("https://reform-precise-assets-harbor.trycloudflare.com/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  console.log(data.answer);
  return data.answer;
}
