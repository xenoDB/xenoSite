import CodeBlock from "../utilities/codeblock";
import { FaBolt, FaCode, FaGlobe, FaShield } from "react-icons/fa6";
import useScrollRestoration from "../hooks/RetainScroll";
import { IoWarning } from "react-icons/io5";
import { FcDataConfiguration } from "react-icons/fc";
import { SiTypescript, SiZod } from "react-icons/si";

const heading = (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg">
      <FaCode className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
      Client Implementation
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
      Connect to your XenoDB server with the powerful DatabaseManager client
      featuring type safety and real-time capabilities.
    </p>
  </div>
);

const features = [
  {
    icon: FaBolt,
    title: "Async/Await API",
    description:
      "Modern Promise-based API with full async/await support for clean, readable code.",
  },
  {
    icon: FaShield,
    title: "Type Safety",
    description:
      "Built-in Zod validation and TypeScript generics for runtime and compile-time type checking.",
  },
  {
    icon: FaGlobe,
    title: "Auto-Reconnection",
    description:
      "Intelligent connection management with automatic reconnection and request queuing.",
  },
].map((feature, index) => {
  {
    const Icon = feature.icon;
    return (
      <div
        key={index}
        className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
      >
        <div className="flex items-center justify-left gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-2">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    );
  }
});

const connect = (
  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
    <div className="flex items-center gap-2">
      <IoWarning className="w-5 h-5 text-red-600" />
      <h4 className="font-semibold text-red-800">Important :</h4>
      <p className="text-red-700 text-sm mt-1">
        You must call{" "}
        <code className="bg-red-100 px-1 rounded">manager.connect()</code> and{" "}
        <code className="bg-red-100 px-1 rounded">await</code> for the promise
        to resolve before attempting to create any database/s.
      </p>
    </div>
  </div>
);

const ManagerSetup = (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">
      Server Setup & Configuration :
    </h2>
    <CodeBlock
      code={
        `import { DatabaseManager } from "@xenodb/client"; // For ES Module\n` +
        `const { DatabaseManager } = require("@xenodb/client"); // For CommonJS\n` +
        `\n` +
        `const manager = new DatabaseManager({\n` +
        `   port: 8080,\n` +
        `   url: "10.254.254.117",\n` +
        `   auth: "YOUR_SECRET_TOKEN"\n` +
        `});\n` +
        `\n` +
        `await manager.connect(); // Must be called before creating databases\n` +
        `\n` +
        `manager.on("error", (e) => console.error(\`\${new Date().toLocaleString()} - [Manager] - Error\`, e));\n` +
        `manager.on("disconnected", () => console.log(\`\${new Date().toLocaleString()} - [Manager] - Disconnected\`));\n`
      }
      language="typescript"
      id="ssl-server"
    />
    {connect}
  </div>
);

const noValidation = (
  <div className="mb-6">
    <div className="flex items-center gap-1 mb-2">
      <h3 className="text-lg font-semibold text-slate-700">
        1. No Schema Validation :
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        The simplest approach - no validation/s, accepts any data structure.
      </p>
    </div>
    <CodeBlock
      code={
        `/** @type { Database<unknown> } */\n` +
        `const DB = manager.createDatabase("/path/to/storage");\n`
      }
      language="typescript"
      id="ssl-se"
    />
  </div>
);

const zodValidation = (
  <div className="mb-6">
    <div className="flex items-center gap-1 mb-2">
      <h3 className="text-lg font-semibold text-slate-700">
        2. Zod ( Run-time validation ) :
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        Use Zod schemas for runtime validation. Perfect for ensuring data
        integrity and providing helpful error messages.
      </p>
    </div>
    <CodeBlock
      code={
        `import { z } from "zod";\n` +
        `\n` +
        `const UserSchema = z.object({\n` +
        `  id: z.string(),\n` +
        `  name: z.string(),\n` +
        `  email: z.string().email(),\n` +
        `  age: z.number().min(0),\n` +
        `  isActive: z.boolean().default(true)\n` +
        `});\n` +
        `\n` +
        `/** @type { Database<z.infer<UserSchema>> } */\n` +
        `const DB = manager.createDatabase("/path/to/storage", UserSchema);\n`
      }
      language="typescript"
      id="ssl-se"
    />
  </div>
);

const tsValidation = (
  <div className="mb-6">
    <div className="flex items-center gap-1 mb-2">
      <h3 className="text-lg font-semibold text-slate-700">
        3. TypeScript Generics ( Compile-time validation) :
      </h3>
      <p className="text-slate-600 text-sm mt-1">
        Use TypeScript generics for compile-time type checking for safety
        without any runtime overhead.
      </p>
    </div>
    <CodeBlock
      code={
        `interface User {\n` +
        `   id: string;\n` +
        `   name: string;\n` +
        `   email: string;\n` +
        `   age: number;\n` +
        `   isActive: boolean;\n` +
        `}\n` +
        `\n` +
        `/** @type { Database<User> } */\n` +
        `const DB = manager.createDatabase<User>("/path/to/storage");\n`
      }
      language="typescript"
      id="ssl-se"
    />
  </div>
);

const DatabaseSetup = (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800 ">
        Database Creation and Schema validation :
      </h2>
      <p className="text-slate-600 text-sm">
        XenoDB supports three different approaches to database creation, each
        offering different levels of type safety and validation.
      </p>
    </div>

    {noValidation}
    {zodValidation}
    {tsValidation}
  </div>
);

const sslOptions = (
  <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-xl lg:col-span-full">
    <div className="flex-1 min-w-0">
      <h4 className="flex font-semibold text-purple-800 mb-1 gap-2">
        <FcDataConfiguration className="w-5 h-5 text-purple-600 mt-0.5" />
        Server Configuration Options
      </h4>
      <div className="w-full overflow-auto rounded-md">
        <CodeBlock
          code={
            `type ConstructorOptions =\n` +
            `| { \n` +
            `    url: string;        // IP or URL with port (e.g., x.com:8022 or 3.12.127:443)\n` +
            `    auth: string;       // Authentication token\n` +
            `  }\n` +
            `| { \n` +
            `    url: string;        // Hostname (e.g., "localhost", "api.example.com")\n` +
            `    port: number;       // Port number (e.g., 8080, 443)\n` +
            `    auth: string;       // Authentication token\n` +
            `    secure?: boolean;   // Use HTTPS (default: false) | Only set to true if server has SSL enabled\n` +
            `  };\n`
          }
          language="typescript"
          id="ssl-server"
          color="purple"
        />
      </div>
    </div>
  </div>
);

const tsBenefits = (
  <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
    <div>
      <h4 className="flex font-semibold text-blue-800 mb-1 gap-2">
        <SiTypescript className="w-5 h-5 text-blue-600 mt-0.5" />
        Typescript validation
      </h4>
      <ul className="text-blue-700 text-sm space-y-1 list-disc pl-5">
        <li>Compile-time type checking and IntelliSense</li>
        <li>Zero runtime overhead</li>
        <li>Better IDE support and refactoring</li>
        <li>Catches type errors before deployment</li>
      </ul>
    </div>
  </div>
);

const zodBenefits = (
  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
    <div>
      <h4 className="flex font-semibold text-green-800 mb-1 gap-2">
        <SiZod className="w-5 h-5 text-green-600 mt-0.5" />
        Zod-based validation
      </h4>
      <ul className="text-green-700 text-sm space-y-1 list-disc pl-5">
        <li>Runtime validation and type coercion</li>
        <li>Detailed error messages for invalid data</li>
        <li>Default values and transformations</li>
        <li>Schema composition and reusability</li>
      </ul>
    </div>
  </div>
);

const InfoTable = (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">
      Other relevant informations :
    </h2>

    <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
      {sslOptions}
      {tsBenefits}
      {zodBenefits}
    </div>
  </div>
);

const bestPractices = (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Best practices :</h2>
    <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl lg:col-span-2">
      <div>
        <ul className="text-blue-700 text-sm space-y-1 list-disc pl-5">
          <li>Use Zod for production applications requiring data validation</li>
          <li>Use TypeScript generics for internal tools and prototypes</li>
          <li>
            Do not use schema validation for dynamic or unknown data structures
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function ClientImplementation() {
  useScrollRestoration();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {heading}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features}
      </div>

      {ManagerSetup}

      {DatabaseSetup}

      {InfoTable}

      {bestPractices}
    </div>
  );
}
