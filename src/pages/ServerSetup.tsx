import CodeBlock from "../utilities/CodeBlock";
import { PiCertificateFill } from "react-icons/pi";
import { FcDataConfiguration } from "react-icons/fc";
import { FaKey, FaListCheck, FaServer, FaShield } from "react-icons/fa6";
import useScrollRestoration from "../hooks/RetainScroll";

const heading = (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
      <FaServer className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
      Server Setup
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
      Configure and deploy your XenoDB server with SSL support, authentication,
      and WebSocket capabilities.
    </p>
  </div>
);

const features = [
  {
    icon: FaServer,
    title: "WS(S) over HTTP(S)",
    description:
      "Exposes a RESTful HTTP(S) API for metrics alongside a WebSocket WS(S) endpoint on the same port.",
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
].map((feature, index) => {
  {
    const Icon = feature.icon;
    return (
      <div
        key={index}
        className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
      >
        <div className="flex items-center justify-left gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-2">
            <Icon className="w-5 h-5 text-green-600" />
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

const serverSetup = (
  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-slate-100 mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">
      Server Setup & Configuration :
    </h2>
    <CodeBlock
      code={
        `import { DatabaseServer } from "@xenodb/server"; // For ES Module\n` +
        `const { DatabaseServer } = require("@xenodb/server"); // For CommonJS\n` +
        `\n` +
        `const server = new DatabaseServer({\n` +
        `  port: 8080,\n` +
        `  auth: "YOUR_SECRET_TOKEN",\n` +
        `});\n` +
        `\n` +
        `server.onStdout(msg => console.log(\`\${new Date().toLocaleString()} - [DATABASE_SERVER] - \${msg}\`));\n` +
        `\n` +
        `// Calling \`new DatabaseServer(...)\` automatically starts the server on the port you specified above.`
      }
      language="typescript"
      id="ssl-server"
    />
  </div>
);

const sslOptions = (
  <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-xl lg:row-span-2">
    <div className="flex-1 min-w-0">
      <h4 className="flex font-semibold text-purple-800 mb-1 gap-2">
        <FcDataConfiguration className="w-5 h-5 text-purple-600 mt-0.5" />
        Server Configuration Options
      </h4>
      <div className="w-full overflow-auto rounded-md">
        <CodeBlock
          code={
            `type ConstructorOptions = {\n` +
            `  port: number;                      // Server port (e.g., 8080, 443)\n` +
            `  auth: string;                      // Authentication token/secret\n` +
            `  ssl?: {                            // Optional SSL configuration\n` +
            `     key: string;                    // Private key content\n` +
            `     cert: string;                   // Certificate content\n` +
            `     ciphers?: string;               // Allowed cipher suites\n` +
            `     dhparam?: string;               // Diffie-Hellman parameters\n` +
            `     passphrase?: string;            // Private key passphrase\n` +
            `     requestCert?: boolean;          // Request client certificate\n` +
            `     ca?: string | string[];         // Certificate Authority\n` +
            `     secureProtocol?: string;        // SSL/TLS protocol version\n` +
            `     honorCipherOrder?: boolean;     // Use server cipher preferences\n` +
            `     rejectUnauthorized?: boolean;   // Reject unauthorized connections\n` +
            `   }\n` +
            `};`
          }
          transparent
          id="ssl-server"
          language="typescript"
        />
      </div>
    </div>
  </div>
);

const bestPractices = (
  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
    <div>
      <h4 className="flex font-semibold text-green-800 mb-1 gap-2">
        <FaListCheck className="w-5 h-5 text-green-600 mt-0.5" />
        SSL Best Practices
      </h4>
      <ul className="text-green-700 text-sm space-y-1 list-disc pl-5">
        <li>Use strong cipher suites</li>
        <li>Enable certificate verification</li>
        <li>Use TLS 1.2 or higher</li>
        <li>Regularly update certificates</li>
      </ul>
    </div>
  </div>
);

const certificateManagement = (
  <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
    <div>
      <h4 className="flex font-semibold text-amber-800 mb-1 gap-2">
        <PiCertificateFill className="w-5 h-5 text-amber-600 mt-0.5" />
        Certificate Management
      </h4>
      <ul className="text-amber-700 text-sm space-y-1 list-disc pl-5">
        <li>Store private keys securely</li>
        <li>Monitor certificate expiration</li>
        <li>Use proper file permissions</li>
        <li>Consider using Let's Encrypt</li>
      </ul>
    </div>
  </div>
);

const configInfoTable = (
  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-slate-100 mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">
      SSL Setup & Configuration :
    </h2>

    <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
      {sslOptions}
      {bestPractices}
      {certificateManagement}
    </div>
  </div>
);

const info = (
  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-slate-100">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">
      Other relevant informations :
    </h2>
    <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl lg:col-span-2">
      <div>
        <ul className="text-blue-700 text-sm space-y-1 list-disc pl-5">
          <li>
            Make sure to use a strong, unique authentication token. This token
            will be required by all clients connecting to your database.
          </li>

          <li>
            The SSL configuration is optional, but for production environments,
            it's recommended to enable SSL/TLS encryption to ensure secure data
            transmission.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function ServerSetup() {
  useScrollRestoration();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {heading}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features}
      </div>

      {serverSetup}

      {configInfoTable}

      {info}
    </div>
  );
}
