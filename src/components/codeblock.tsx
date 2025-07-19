import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import { FaCheck, FaCopy } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

type CodeBlockProps = {
  code: string;
  language: string;
  id: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, id }) => {
  const [highlighted, setHighlighted] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const grammar = Prism.languages[language] || Prism.languages.javascript;
        const html = Prism.highlight(code, grammar, language);
        setHighlighted(html);
      } catch {
        setHighlighted(code);
      }
    };
    load();
  }, [code, language]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-xl">
        <span className="text-slate-300 text-sm font-medium">{language}</span>
        <button
          aria-label={`Copy code snippet: ${id}`}
          onClick={() => handleCopy(code, id)}
          className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
        >
          {copiedCode === id ? (
            <>
              <FaCheck className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <FaCopy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-6 rounded-b-xl overflow-x-auto text-sm">
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
