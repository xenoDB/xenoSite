import Prism from "prismjs";
import * as React from "react";
import "prismjs/themes/prism-coy.min.css";
import { FaCheck, FaCopy } from "react-icons/fa";

type CodeBlockProps = { code: string; language: string; id: string };

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, id }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const copyButton = (
    <button
      onClick={() => handleCopy(code, id)}
      aria-label={`Copy code snippet: ${id}`}
      className="absolute top-2 right-2 flex items-center space-x-1 text-slate-600 hover:text-slate-800 transition-colors text-sm"
    >
      {copiedCode === id ? (
        <FaCheck className="w-4 h-4" />
      ) : (
        <FaCopy className="w-4 h-4" />
      )}
    </button>
  );

  const codeBlockBody = (
    <pre className="relative bg-slate-100 p-6 rounded-xl overflow-x-auto text-sm">
      {copyButton}
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
          ),
        }}
      />
    </pre>
  );

  return <div className="relative">{codeBlockBody}</div>;
};

export default CodeBlock;
