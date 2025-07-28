import { useNavigate } from "react-router-dom";
import CodeBlock from "../utilities/codeblock";
import useScrollRestoration from "../hooks/RetainScroll";

export default function Contents() {
  useScrollRestoration();

  const navigate = useNavigate();
  const handleNavClick = (pageId: string) => navigate(`/${pageId}`);

  const quickStartCode =
    `import { DatabaseServer } from "@xenodb/server";\n` +
    `import { DatabaseManager } from "@xenodb/client";\n` +
    `\n` +
    `const server = new DatabaseServer({\n` +
    `  port: 8080,\n` +
    `  auth: "YOUR_SECRET_TOKEN"\n` +
    `});\n` +
    `\n` +
    `const manager = new DatabaseManager({\n` +
    `  url: "localhost",\n` +
    `  port: 8080,\n` +
    `  auth: "YOUR_SECRET_TOKEN"\n` +
    `});\n` +
    `\n` +
    `await manager.connect();\n` +
    `\n` +
    `const DB = await manager.createDatabase("path/to/your/database");`;

  const code = (
    <div className="flex-1 flex items-center justify-center w-full md:w-auto">
      <div className="w-full max-w-xl">
        <CodeBlock
          code={quickStartCode}
          language="typescript"
          id="quick-start"
        />
      </div>
    </div>
  );

  const heading = (
    <p className="flex justify-center font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8">
      <h1 className="text-6xl">XenoDB</h1>
      <p className="text-2xl">™</p>
    </p>
  );

  const description = (
    <p className="text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
      A modern, type-safe database solution with real-time capabilities, built
      for performance and developer experience.
    </p>
  );

  const getStartedButton = (
    <button
      onClick={() => handleNavClick("server-setup")}
      className="px-8 py-4 bg-transparent font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-300"
    >
      <span className="text-[17px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Get Started
      </span>
    </button>
  );

  const apiReferenceButton = (
    <button
      onClick={() => handleNavClick("database-methods")}
      className="px-8 py-4 bg-transparent font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 border border-slate-300"
    >
      <span className="text-[17px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        API Reference
      </span>
    </button>
  );

  const buttons = (
    <div className="flex sm:flex-row gap-4 justify-center md:justify-center">
      {getStartedButton}
      {apiReferenceButton}
    </div>
  );

  const body = (
    <div className="flex-1 text-center md:text-center">
      {heading} {description} {buttons}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        {body}
        {code}
      </div>
    </div>
  );
}
