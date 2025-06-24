from flask import Flask, render_template_string, request, jsonify
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

app = Flask(__name__)

# HTML+CSS frontend (dark themed)
HTML_PAGE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ZINDABOT 🤖</title>
  <style>
    body {
      background-color: #121212;
      color: #e0e0e0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    h1 {
      text-align: center;
      margin: 20px 0;
      color: #03dac6;
    }
    #chat {
      flex-grow: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .bubble {
      max-width: 70%;
      padding: 10px 15px;
      margin: 8px 0;
      border-radius: 12px;
      line-height: 1.4;
    }
    .user { 
      align-self: flex-end;
      background: #03dac6;
      color: #000;
    }
    .bot {
      align-self: flex-start;
      background: #333;
      color: #bb86fc;
    }
    form {
      display: flex;
      padding: 15px;
      background: #1e1e1e;
      border-top: 1px solid #333;
    }
    input {
      flex: 1;
      padding: 12px;
      font-size: 16px;
      border: none;
      border-radius: 8px;
      background: #2c2c2c;
      color: #fff;
    }
    button {
      margin-left: 10px;
      padding: 12px 20px;
      background: #03dac6;
      border: none;
      border-radius: 8px;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
    button:hover {
      background: #018786;
    }
  </style>
</head>
<body>
  <h1>ZINDABOT 🤖</h1>
  <div id="chat"></div>
  <form onsubmit="ask(event)">
    <input type="text" id="q" placeholder="Ask anything..." autocomplete="off" required>
    <button type="submit">Send</button>
  </form>

  <script>
    const chat = document.getElementById('chat');
    const q = document.getElementById('q');

    async function ask(e) {
      e.preventDefault();
      const question = q.value.trim();
      if (!question) return;
      
      addBubble(question, 'user');
      q.value = '';
      
      const res = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      addBubble(data.answer, 'bot');
    }

    function addBubble(text, type) {
      const div = document.createElement('div');
      div.className = `bubble ${type}`;
      div.textContent = text;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    q.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.querySelector("form").dispatchEvent(new Event("submit"));
      }
    });
  </script>
</body>
</html>

"""

# Setup Ollama connection to gemma:2b
llm = Ollama(model="gemma:2b")

# Template for question answering
template = """Answer the question clearly and helpfully:\n\n{question}"""
prompt = PromptTemplate(input_variables=["question"], template=template)
chain = LLMChain(llm=llm, prompt=prompt)

@app.route("/")
def index():
    return render_template_string(HTML_PAGE)

@app.route("/ask", methods=["POST"])
def ask():
    q = request.json["question"]
    answer = chain.run(question=q)
    return jsonify({"answer": answer.strip()})

if __name__ == "__main__":
    # Runs on localhost:7860
    app.run(host="0.0.0.0", port=7860, debug=True)

