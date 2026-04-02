import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";
import { MdOutlineUploadFile, MdContentCopy } from "react-icons/md";
import { SkeletonLoader } from "./components/SkeletonLoader";
import { CodeStatsCard } from "./components/CodeStatsCard";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [code, setCode] = useState(`def sum(a, b):\n  return a + b\n`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = savedTheme ? savedTheme === "dark" : true;
    setIsDark(prefersDark);

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      alert("Please enter some code to review");
      return;
    }

    setLoading(true);
    setReview("");

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review/",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error: Unable to connect to AI service.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(file);
    }
  }

  function copyReview() {
    navigator.clipboard.writeText(review);
    alert("Review copied!");
  }

  return (
    <div className="h-screen flex flex-col p-6 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-black">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 rounded-xl shadow-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div>
          <h1 className="text-2xl font-bold">🤖 AI Code Reviewer</h1>
          <p className="text-sm text-indigo-100">
            Intelligent code analysis powered by AI
          </p>
        </div>
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </header>

      {/* Controls */}
      <div className="flex gap-4 mt-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
          <MdOutlineUploadFile />
          Upload File
          <input
            type="file"
            accept=".js,.py,.css,.cpp,.ts,.html,.json,.java"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Editor Panel */}
        <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border flex flex-col min-h-0 min-w-5">
          <h2 className="text-xl font-bold mb-4 text-indigo-500">
            Code Editor
          </h2>

          <CodeStatsCard code={code} />

          <div className="border rounded-lg p-4 mb-4 bg-slate-100 dark:bg-slate-900 flex-1 overflow-auto">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(
                  code,
                  prism.languages[language] || prism.languages.javascript,
                  language
                )
              }
              padding={10}
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: 15,
              }}
            />
          </div>

          <button
            onClick={reviewCode}
            disabled={loading}
            className="w-full py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 transition-all"
          >
            {loading ? "Analyzing..." : "Review Code"}
          </button>
        </div>

        {/* Review Panel */}
        <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border flex flex-col min-h-0 min-w-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-purple-500">
              AI Review
            </h2>

            {review && (
              <button
                onClick={copyReview}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded"
              >
                <MdContentCopy /> Copy
              </button>
            )}
          </div>

          <div className="flex-1 overflow-auto rounded-lg p-4 bg-slate-100 dark:bg-slate-900">
            {loading ? (
              <SkeletonLoader />
            ) : review ? (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                className="prose dark:prose-invert max-w-none"
              >
                {review}
              </Markdown>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Write or upload code and click Review
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-3 text-sm text-slate-500">
        ✨ AI Code Reviewer • React + Tailwind + AI
      </footer>
    </div>
  );
}

export default App;