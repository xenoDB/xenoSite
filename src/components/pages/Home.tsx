import CodeBlock from "../codeblock";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaDatabase } from "react-icons/fa";
export default function Contents() {
  const navigate = useNavigate();
  const handleNavClick = (pageId: string) => {
    navigate(`/${pageId}`);
  };

  const quickStartCode = `// Server Setup
import { DatabaseServer } from "@xenodb/server";

const server = new DatabaseServer({
  port: 8080,
  auth: "YOUR_SECRET_TOKEN"
});

// Client Connection
import { DatabaseManager } from "@xenodb/client";

const manager = new DatabaseManager({
  url: "localhost",
  port: 8080,
  auth: "YOUR_SECRET_TOKEN"
});

await manager.connect();`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Hero Section with Quick Start Code on the right */}
      <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-xl">
            <FaDatabase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            XenoDB
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto md:mx-0 leading-relaxed">
            A modern, type-safe database solution with real-time capabilities,
            built for performance and developer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => handleNavClick("server-setup")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <FaArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavClick("database-methods")}
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-slate-200 hover:border-slate-300"
            >
              View API Reference
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center w-full md:w-auto">
          <div className="w-full max-w-xl">
            <CodeBlock
              code={quickStartCode}
              language="typescript"
              id="quick-start"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
