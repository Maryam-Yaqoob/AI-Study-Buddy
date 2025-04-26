const API_KEY = "AIzaSyBYTvodPxi1aCam6yLzdNd-WQJKGPTfToY";  

async function sendToGemini(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  return reply;
}

async function generateSummary() {
  const text = document.getElementById("inputText").value;
  const prompt = `Summarize the following notes in simple bullet points:\n\n${text}`;

  document.getElementById("output").innerHTML = "<p><em>Generating summary...</em></p>";
  const summary = await sendToGemini(prompt);
  document.getElementById("output").innerHTML = `<h2>Summary:</h2><p>${summary.replace(/\n/g, "<br>")}</p>`;
}

async function generateFlashcards() {
  const text = document.getElementById("inputText").value;
  const prompt = `Create flashcards (Question and Answer format) from these study notes:\n\n${text}`;

  document.getElementById("output").innerHTML = "<p><em>Generating flashcards...</em></p>";
  const flashcards = await sendToGemini(prompt);
  document.getElementById("output").innerHTML = `<h2>Flashcards:</h2><p>${flashcards.replace(/\n/g, "<br>")}</p>`;
}

async function generateQuiz() {
  const text = document.getElementById("inputText").value;
  const prompt = `Create a short quiz (5 MCQs) based on the following notes:\n\n${text}`;

  document.getElementById("output").innerHTML = "<p><em>Generating quiz...</em></p>";
  const quiz = await sendToGemini(prompt);
  document.getElementById("output").innerHTML = `<h2>Quiz:</h2><p>${quiz.replace(/\n/g, "<br>")}</p>`;
}
