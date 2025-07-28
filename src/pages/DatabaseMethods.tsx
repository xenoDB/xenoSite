import useScrollRestoration from "../hooks/retainScroll";
import CodeBlock from "../utilities/codeblock";
import { FaDatabase, FaTrash, FaUsers, FaBolt } from "react-icons/fa";

export default function DatabaseMethods() {
  useScrollRestoration();

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

  const categoryColors = {
    Read: "from-blue-500 to-cyan-500",
    Write: "from-green-500 to-emerald-500",
    Delete: "from-red-500 to-pink-500",
    "Batch Read": "from-purple-500 to-violet-500",
    "Batch Write": "from-orange-500 to-amber-500",
    "Batch Delete": "from-rose-500 to-red-500",
  };

  const performanceExample = `// Example: Efficient batch operations
const userIds = ["user1", "user2", "user3", "user4", "user5"];

// ❌ Inefficient: Multiple individual requests
const users1 = [];
for (const id of userIds) {
  const user = await DB.get(id);
  users1.push(user);
}

// ✅ Efficient: Single batch request
const users2 = await DB.getMany(userIds);

// Performance improvement: ~5x faster for 5 items
// Scales even better with more items`;

  const errorHandlingExample = `// Example: Proper error handling
try {
  // Create user with validation
  const user = await DB.set("user123", {
    id: "user123",
    name: "Alice Smith",
    email: "alice@example.com",
    age: 30
  });
  
  console.log("User created:", user);
} catch (error) {
  if (error.message.includes("validation")) {
    console.error("Invalid user data:", error.message);
  } else {
    console.error("Database error:", error);
  }
}`;

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

      {/* Quick Overview */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Quick Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaDatabase className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">
              3 Read Methods
            </h3>
            <p className="text-sm text-slate-600">all(), has(), get()</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaBolt className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">
              3 Batch Methods
            </h3>
            <p className="text-sm text-slate-600">
              getMany(), setMany(), deleteMany()
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaTrash className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">
              2 Write Methods
            </h3>
            <p className="text-sm text-slate-600">set(), delete()</p>
          </div>
        </div>
      </div>

      {/* Method Reference */}
      <div className="space-y-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800">Method Reference</h2>

        {methods.map((method, index) => {
          const Icon = method.icon;
          const gradientClass =
            categoryColors[method.category as keyof typeof categoryColors];

          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                <div className="lg:w-1/3 mb-6 lg:mb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        {method.name}
                      </h3>
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                        {method.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{method.description}</p>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">
                      Type Signature
                    </h4>
                    <code className="text-sm text-slate-800">
                      {method.signature}
                    </code>
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <h4 className="text-lg font-semibold text-slate-700 mb-3">
                    Example Usage
                  </h4>
                  <CodeBlock
                    code={method.example}
                    language="typescript"
                    id={`method-${index}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Tips */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Performance Optimization
        </h2>
        <p className="text-slate-600 mb-6">
          Use batch operations when working with multiple keys to significantly
          improve performance and reduce network overhead.
        </p>
        <CodeBlock
          code={performanceExample}
          language="typescript"
          id="performance-example"
        />
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">
              ✅ Best Practices
            </h4>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Use batch methods for multiple operations</li>
              <li>• Check existence with has() before get() if needed</li>
              <li>• Handle null returns from get() and getMany()</li>
              <li>• Use meaningful key naming conventions</li>
            </ul>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h4 className="font-semibold text-amber-800 mb-2">
              ⚠️ Performance Tips
            </h4>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Batch operations are ~5-10x faster</li>
              <li>• Limit batch sizes to 100-1000 items</li>
              <li>• Use all() sparingly for large databases</li>
              <li>• Consider pagination for large result sets</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Error Handling
        </h2>
        <p className="text-slate-600 mb-6">
          All database methods return Promises and should be wrapped in
          try-catch blocks for proper error handling.
        </p>
        <CodeBlock
          code={errorHandlingExample}
          language="typescript"
          id="error-handling"
        />
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Error Types</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>
              • <strong>Validation errors:</strong> When using Zod schemas and
              data doesn't match
            </li>
            <li>
              • <strong>Network errors:</strong> Connection issues or server
              unavailability
            </li>
            <li>
              • <strong>Timeout errors:</strong> Operations taking longer than
              2.5 seconds
            </li>
            <li>
              • <strong>Authentication errors:</strong> Invalid or missing auth
              tokens
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
