import CodeBlock from "../utilities/codeblock";
import {
  FaCode,
  FaBolt,
  FaShield,
  FaGlobe,
  FaExclamation,
} from "react-icons/fa6";

export default function ClientImplementation() {
  const importCode = `import { DatabaseManager } from "@xenodb/client"; // MJS
const { DatabaseManager } = require("@xenodb/client"); // CJS`;

  const basicConnectionCode = `const manager = new DatabaseManager({
  url: "localhost",
  port: 8080,
  auth: "YOUR_SECRET_TOKEN"
});

await manager.connect(); // Must be called before creating databases`;

  const urlOnlyCode = `const manager = new DatabaseManager({
  url: "https://your-xenodb-server.com",
  auth: "YOUR_SECRET_TOKEN"
});

await manager.connect();`;

  const basicDatabaseCode = `// No schema validation
const DB = manager.createDatabase("/path/to/storage");`;

  const zodSchemaCode = `import { z } from "zod";

// Runtime validation with Zod
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0),
  isActive: z.boolean().default(true)
});

const DB = manager.createDatabase("/users", UserSchema);`;

  const typescriptSchemaCode = `// Compile-time type checking with TypeScript generics
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const DB = manager.createDatabase<User>("/users");`;

  const constructorOptionsCode = `type ConstructorOptions =
  | { 
      url: string;        // Full URL (e.g., "https://api.example.com")
      auth: string;       // Authentication token
    }
  | { 
      url: string;        // Hostname (e.g., "localhost", "api.example.com")
      port: number;       // Port number (e.g., 8080, 443)
      auth: string;       // Authentication token
      secure?: boolean;   // Use HTTPS (default: false for localhost)
    };`;

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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
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

      {/* Features Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Import */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Import DatabaseManager
        </h2>
        <p className="text-slate-600 mb-6">
          Import the DatabaseManager from the XenoDB client package. Both ES
          modules and CommonJS are supported.
        </p>
        <CodeBlock
          code={importCode}
          language="typescript"
          id="import-manager"
        />
      </div>

      {/* Constructor Options */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Constructor Options
        </h2>
        <p className="text-slate-600 mb-6">
          The DatabaseManager supports flexible connection configurations for
          different deployment scenarios.
        </p>
        <CodeBlock
          code={constructorOptionsCode}
          language="typescript"
          id="constructor-options"
        />
      </div>

      {/* Connecting to Server */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Connecting to the Server
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Basic Connection (with Port)
            </h3>
            <p className="text-slate-600 mb-4">
              Connect to a local or remote server by specifying the hostname and
              port.
            </p>
            <CodeBlock
              code={basicConnectionCode}
              language="typescript"
              id="basic-connection"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              URL-based Connection
            </h3>
            <p className="text-slate-600 mb-4">
              For production deployments, you can connect using a full URL with
              automatic protocol detection.
            </p>
            <CodeBlock
              code={urlOnlyCode}
              language="typescript"
              id="url-connection"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <FaExclamation className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Important</h4>
              <p className="text-red-700 text-sm">
                You must call{" "}
                <code className="bg-red-100 px-1 rounded">
                  await manager.connect()
                </code>{" "}
                before attempting to create any databases. This establishes the
                WebSocket connection required for real-time operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Database Creation */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Database Creation
        </h2>
        <p className="text-slate-600 mb-8">
          XenoDB supports three different approaches to database creation, each
          offering different levels of type safety and validation.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              1. No Schema Validation
            </h3>
            <p className="text-slate-600 mb-4">
              The simplest approach - no runtime validation, accepts any data
              structure.
            </p>
            <CodeBlock
              code={basicDatabaseCode}
              language="typescript"
              id="basic-database"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              2. Runtime Validation with Zod
            </h3>
            <p className="text-slate-600 mb-4">
              Use Zod schemas for runtime validation. Perfect for ensuring data
              integrity and providing helpful error messages.
            </p>
            <CodeBlock
              code={zodSchemaCode}
              language="typescript"
              id="zod-database"
            />
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <h4 className="font-semibold text-green-800 mb-2">
                ✅ Zod Benefits
              </h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Runtime validation and type coercion</li>
                <li>• Detailed error messages for invalid data</li>
                <li>• Default values and transformations</li>
                <li>• Schema composition and reusability</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              3. TypeScript Generics (Compile-time)
            </h3>
            <p className="text-slate-600 mb-4">
              Use TypeScript generics for compile-time type checking. Great for
              development-time safety without runtime overhead.
            </p>
            <CodeBlock
              code={typescriptSchemaCode}
              language="typescript"
              id="typescript-database"
            />
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">
                💡 TypeScript Benefits
              </h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Compile-time type checking and IntelliSense</li>
                <li>• Zero runtime overhead</li>
                <li>• Better IDE support and refactoring</li>
                <li>• Catches type errors before deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">
              Connection Management
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  Always call{" "}
                  <code className="bg-slate-100 px-1 rounded text-sm">
                    connect()
                  </code>{" "}
                  before database operations
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  Use a single DatabaseManager instance per application
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  Handle connection errors gracefully with try-catch blocks
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-700">
              Schema Selection
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  Use Zod for production applications requiring data validation
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  TypeScript generics for internal tools and prototypes
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  No schema validation for dynamic or unknown data structures
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
