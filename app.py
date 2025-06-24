import os
from flask import Flask, render_template_string, request, jsonify
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaLLM
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Load instructions and websites
home = os.path.expanduser("~")
os.makedirs(f"{home}/Documents/zindabot", exist_ok=True)
instr_file = f"{home}/Documents/zindabot/instructions.txt"
websites_file = f"{home}/Documents/zindabot/websites.txt"

instructions = open(instr_file).read() if os.path.exists(instr_file) else "You are ZINDABOT."
websites = open(websites_file).read().splitlines() if os.path.exists(websites_file) else ["https://website99.com/demo/RA"]

# Load web content
docs = []
for url in websites:
    loader = WebBaseLoader(url)
    docs += loader.load()

# Build embeddings + vector DB
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_documents(docs)

emb = OllamaEmbeddings(model="mxbai-embed-large")
vectorstore = Chroma.from_documents(chunks, embedding=emb)

llm = OllamaLLM(model="gemma:2b")

qa = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    chain_type="stuff"
)

app = Flask(__name__)

HTML = """
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

@app.route("/")
def index():
    return HTML

@app.route("/ask", methods=["POST"])
def ask():
    q = request.json.get("question", "")
    context = instructions
    ans = qa.run(q)
    return jsonify(answer=ans)

if __name__=="__main__":
    app.run(host="0.0.0.0", port=7860)
