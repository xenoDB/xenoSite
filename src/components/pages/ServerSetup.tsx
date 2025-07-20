import CodeBlock from "../utilities/codeblock";
import { FaGlobe, FaKey, FaServer, FaShield } from "react-icons/fa6";

export default function ServerSetup() {
  const basicServerCode = `import { DatabaseServer } from "@xenodb/server";

const server = new DatabaseServer({
  port: 8080,
  auth: "YOUR_SECRET_TOKEN"
});`;

  const sslServerCode = `import { DatabaseServer } from "@xenodb/server";
import { readFileSync } from "fs";

const server = new DatabaseServer({
  port: 8080,
  auth: "YOUR_SECRET_TOKEN",
  ssl: {
    key: readFileSync("path/to/private.key"),
    cert: readFileSync("path/to/certificate.crt"),
    ca: readFileSync("path/to/ca.crt"), // optional
    passphrase: "your-key-passphrase", // if required
    rejectUnauthorized: true,
    requestCert: false,
    honorCipherOrder: true,
    secureProtocol: "TLSv1_2_method"
  }
});`;

  const sslOptionsCode = `type SSLOptions = {
  key: string;                    // Private key content
  cert: string;                   // Certificate content
  ciphers?: string;               // Allowed cipher suites
  dhparam?: string;               // Diffie-Hellman parameters
  passphrase?: string;            // Private key passphrase
  requestCert?: boolean;          // Request client certificate
  ca?: string | string[];         // Certificate Authority
  secureProtocol?: string;        // SSL/TLS protocol version
  honorCipherOrder?: boolean;     // Use server cipher preferences
  rejectUnauthorized?: boolean;   // Reject unauthorized connections
};`;

  const constructorOptionsCode = `type ConstructorOptions = {
  port: number;        // Server port (e.g., 8080, 443)
  auth: string;        // Authentication token/secret
  ssl?: SSLOptions;    // Optional SSL configuration
};`;

  const commonJsCode = `const { DatabaseServer } = require("@xenodb/server");

const server = new DatabaseServer({
  port: 8080,
  auth: "YOUR_SECRET_TOKEN"
});`;

  const features = [
    {
      icon: FaServer,
      title: "HTTP(S) Server",
      description:
        "Creates a robust HTTP or HTTPS server with RESTful API endpoints for database operations.",
    },
    {
      icon: FaGlobe,
      title: "WebSocket Support",
      description:
        "Built-in WebSocket server for real-time data synchronization with client verification.",
    },
    {
      icon: FaShield,
      title: "SSL/TLS Security",
      description:
        "Full SSL/TLS support with configurable cipher suites and certificate management.",
    },
    {
      icon: FaKey,
      title: "Authentication",
      description:
        "Token-based authentication system to secure your database server from unauthorized access.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
          <FaServer className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Server Setup
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Configure and deploy your XenoDB server with SSL support,
          authentication, and WebSocket capabilities.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-green-600" />
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

      {/* Import Methods */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Import DatabaseServer
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              ES Modules (Recommended)
            </h3>
            <CodeBlock
              code='import { DatabaseServer } from "@xenodb/server";'
              language="typescript"
              id="import-esm"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              CommonJS
            </h3>
            <CodeBlock
              code='const { DatabaseServer } = require("@xenodb/server");'
              language="javascript"
              id="import-cjs"
            />
          </div>
        </div>
      </div>

      {/* Constructor Options */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Constructor Options
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              ConstructorOptions Type
            </h3>
            <CodeBlock
              code={constructorOptionsCode}
              language="typescript"
              id="constructor-options"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              SSLOptions Type
            </h3>
            <CodeBlock
              code={sslOptionsCode}
              language="typescript"
              id="ssl-options"
            />
          </div>
        </div>
      </div>

      {/* Basic Setup */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Basic Server Setup
        </h2>
        <p className="text-slate-600 mb-6">
          The simplest way to get started with XenoDB is to create a basic HTTP
          server with authentication.
        </p>
        <CodeBlock
          code={basicServerCode}
          language="typescript"
          id="basic-server"
        />
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <FaShield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">
                Security Note
              </h4>
              <p className="text-blue-700 text-sm">
                Make sure to use a strong, unique authentication token. This
                token will be required by all clients connecting to your
                database.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SSL/HTTPS Setup */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          SSL/HTTPS Configuration
        </h2>
        <p className="text-slate-600 mb-6">
          For production environments, it's recommended to enable SSL/TLS
          encryption to secure data transmission.
        </p>
        <CodeBlock code={sslServerCode} language="typescript" id="ssl-server" />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">
              ✅ SSL Best Practices
            </h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Use strong cipher suites</li>
              <li>• Enable certificate verification</li>
              <li>• Use TLS 1.2 or higher</li>
              <li>• Regularly update certificates</li>
            </ul>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h4 className="font-semibold text-amber-800 mb-2">
              ⚠️ Certificate Management
            </h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Store private keys securely</li>
              <li>• Monitor certificate expiration</li>
              <li>• Use proper file permissions</li>
              <li>• Consider using Let's Encrypt</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CommonJS Example */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          CommonJS Alternative
        </h2>
        <p className="text-slate-600 mb-6">
          If you're using CommonJS modules, here's how to set up the server:
        </p>
        <CodeBlock
          code={commonJsCode}
          language="javascript"
          id="commonjs-server"
        />
      </div>
    </div>
  );
}
