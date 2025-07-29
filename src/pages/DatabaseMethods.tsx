import { FaBolt, FaDatabase, FaTrash, FaUsers } from "react-icons/fa";
import CodeBlock from "../utilities/CodeBlock";

export default function DatabaseMethods() {
  const methods = [
    {
      name: "all()",
      description: "Retrieve all key-value pairs in the database",
      signature: "all(): Promise<Record<string, T>>",
      category: "Read",
      icon: FaDatabase,
      example: `// Get all users
const allUsers = await DB.all();
console.log(allUsers);
// { "user1": { id: "user1", name: "Alice" }, "user2": { id: "user2", name: "Bob" } }`,
    },
    {
      name: "has()",
      description: "Check if a key exists in the database",
      signature: "has(key: string): Promise<boolean>",
      category: "Read",
      icon: FaDatabase,
      example: `// Check if user exists
const exists = await DB.has("user123");
console.log(exists); // true or false`,
    },
    {
      name: "get()",
      description:
        "Fetch the value for a specific key. Returns null if not found",
      signature: "get(key: string): Promise<T | null>",
      category: "Read",
      icon: FaDatabase,
      example: `// Get a specific user
const user = await DB.get("user123");
if (user) {
  console.log(\`Found user: \${user.name}\`);
} else {
  console.log("User not found");
}`,
    },
    {
      name: "set()",
      description:
        "Create or update a value at the given key. Returns the stored value",
      signature: "set(key: string, value: T): Promise<T>",
      category: "Write",
      icon: FaDatabase,
      example: `// Create or update a user
const user = await DB.set("user123", {
  id: "user123",
  name: "Alice Smith",
  email: "alice@example.com"
});
console.log("Stored:", user);`,
    },
    {
      name: "delete()",
      description:
        "Remove a key-value entry. Returns true if successfully deleted",
      signature: "delete(key: string): Promise<boolean>",
      category: "Delete",
      icon: FaTrash,
      example: `// Delete a user
const deleted = await DB.delete("user123");
if (deleted) {
  console.log("User deleted successfully");
} else {
  console.log("User not found");
}`,
    },
    {
      name: "getMany()",
      description: "Batch fetch multiple values. Missing keys yield null",
      signature: "getMany(keys: string[]): Promise<(T | null)[]>",
      category: "Batch Read",
      icon: FaUsers,
      example: `// Get multiple users at once
const users = await DB.getMany(["user1", "user2", "user3"]);
users.forEach((user, index) => {
  if (user) {
    console.log(\`User \${index + 1}:\`, user.name);
  } else {
    console.log(\`User \${index + 1}: Not found\`);
  }
});`,
    },
    {
      name: "setMany()",
      description: "Batch set multiple entries. Returns array of stored values",
      signature: "setMany(data: { key: string; value: T }[]): Promise<T[]>",
      category: "Batch Write",
      icon: FaUsers,
      example: `// Create multiple users at once
const users = await DB.setMany([
  { key: "user1", value: { id: "user1", name: "Alice" } },
  { key: "user2", value: { id: "user2", name: "Bob" } },
  { key: "user3", value: { id: "user3", name: "Charlie" } }
]);
console.log(\`Created \${users.length} users\`);`,
    },
    {
      name: "deleteMany()",
      description: "Batch delete entries. Returns array of booleans per key",
      signature: "deleteMany(keys: string[]): Promise<boolean[]>",
      category: "Batch Delete",
      icon: FaTrash,
      example: `// Delete multiple users
const results = await DB.deleteMany(["user1", "user2", "user3"]);
const deletedCount = results.filter(Boolean).length;
console.log(\`Deleted \${deletedCount} out of \${results.length} users\`);`,
    },
  ];

  const readIcon = (
    <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-2">
      <FaDatabase className="w-5 h-5 text-blue-600" />
    </div>
  );

  const writeIcon = (
    <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-2">
      <FaBolt className="w-5 h-5 text-green-600" />
    </div>
  );

  const deleteIcon = (
    <div className="w-7 h-7 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
      <FaTrash className="w-5 h-5 text-red-600" />
    </div>
  );

  const features = [
    {
      icon: readIcon,
      title: "Read Methods",
      description:
        "Exposes a RESTful HTTP(S) API for metrics alongside a WebSocket WS(S) endpoint on the same port.",
    },
    {
      icon: writeIcon,
      title: "Write Methods",
      description:
        "Full SSL/TLS support with configurable cipher suites and certificate management.",
    },
    {
      icon: deleteIcon,
      title: "Delete Methods",
      description:
        "Token-based authentication system to secure your database server from unauthorized access.",
    },
  ].map((feature, index) => {
    {
      return (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-left gap-2">
            {feature.icon}
            <h3 className="font-semibold text-slate-800 mb-2">
              {feature.title}
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      );
    }
  });

  function T(method: {
    icon: any;
    name: string;
    example: string;
    category: string;
    signature: string;
    description: string;
  }) {
    const card = (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-6">
        <div className="flex items-center justify-left gap-2">
          {method.icon}
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            <span className="text-[#555555]">DB</span>
            <span className="text-[#ED9302]">{"<"}</span>
            <span className="text-[#0269ED]">{"T"}</span>
            <span className="text-[#ED9302]">{">"}</span>.{method.name}
          </h3>
          <div className="text-sm  font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full mb-1">
            {method.category}
          </div>
        </div>

        <div className="flex text-slate-600 mt-2 gap-1 flex-col sm:flex-row">
          <div className="text-sm text-slate-500 font-bold">Signature :</div>
          <div className="text-sm text-slate-500">
            DB{"<T>"}.{method.signature}
          </div>
        </div>

        <div className="flex text-slate-600 mt-2 mb-2 gap-1 flex-col sm:flex-row">
          <div className="text-sm text-slate-500 font-bold">Description :</div>
          <div className="text-sm text-slate-500">{method.description}</div>
        </div>

        <CodeBlock code={method.example} id="" language="typescript" />
      </div>
    );
    return card;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl mb-6 shadow-lg">
          <FaDatabase className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Database Methods
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Complete API reference for all CRUD operations and batch processing
          capabilities in XenoDB.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features}
      </div>

      {methods.map(T)}
    </div>
  );
}
