import { JSX, useState } from "react";
import CodeBlock from "../utilities/CodeBlock";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaDatabase, FaEye, FaPenNib, FaSearch } from "react-icons/fa";

const heading = (
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
);

const readIcon = (
  <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-2">
    <FaEye className="w-5 h-5 text-blue-600" />
  </div>
);

const writeIcon = (
  <div className="w-7 h-7 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-2">
    <FaPenNib className="w-5 h-5 text-green-600" />
  </div>
);

const deleteIcon = (
  <div className="w-7 h-7 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
    <RiDeleteBin5Fill className="w-5 h-5 text-red-600" />
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
          <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>
    );
  }
});

const methods = [
  {
    name: "all()",
    description:
      "Retrieve all key-value pairs in the database. Returns a record object containing all entries",
    signature: "all(): Promise<Record<string, T>>",
    category: "Read",
    icon: readIcon,
    example:
      `// Before: Database contains multiple entries\n` +
      `// DB: { "user1": { id: "1", name: "Alice" }, "user2": { id: "2", name: "Bob" } }\n` +
      `\n` +
      `const allUsers = await DB.all();\n` +
      `console.log(allUsers); // { "user1": { id: "1", name: "Alice" }, "user2": { id: "2", name: "Bob" } }\n` +
      `\n` +
      `// After: Database remains unchanged (read operation)`,
  },
  {
    name: "has()",
    description:
      "Check if a key exists in the database. Returns true if key exists, false otherwise",
    signature: "has(key: string): Promise<boolean>",
    category: "Read",
    icon: readIcon,
    example:
      `// Before: Database contains user1\n` +
      `// DB: { "user1": { id: "1", name: "Alice" } }\n` +
      `\n` +
      `const exists = await DB.has("user1");\n` +
      `console.log(exists); // true\n` +
      `\n` +
      `// After: Database remains unchanged (read operation)`,
  },
  {
    name: "get()",
    description:
      "Fetch the value for a specific key. Returns value if present, otherwise returns null",
    signature: "get(key: string): Promise<T | null>",
    category: "Read",
    icon: readIcon,
    example:
      `// Before: Database contains user2\n` +
      `// DB: { "user2": { id: "user2", name: "Bob" } }\n` +
      `\n` +
      `const user = await DB.get("user2");\n` +
      `console.log(user); // { id: "user2", name: "Bob" }\n` +
      `\n` +
      `// After: Database remains unchanged (read operation)`,
  },
  {
    name: "set()",
    description:
      "Create or update a value at the given key. Returns the stored value",
    signature: "set(key: string, value: T): Promise<T>",
    category: "Write",
    icon: writeIcon,
    example:
      `// Before: Database is empty or doesn't contain user1\n` +
      `// DB: {}\n` +
      `\n` +
      `const user = await DB.set("user1", { id: "user1", name: "Alice" });\n` +
      `console.log(user); // { id: "user1", name: "Alice" }\n` +
      `\n` +
      `// After: Database contains the new entry\n` +
      `// DB: { "user1": { id: "user1", name: "Alice" } }`,
  },
  {
    name: "delete()",
    description:
      "Remove a key-value entry. Returns true if successfully deleted, false if key didn't exist",
    signature: "delete(key: string): Promise<boolean>",
    category: "Delete",
    icon: deleteIcon,
    example:
      `// Before: Database doesn't contain user3\n` +
      `// DB: { "user1": { id: "user1", name: "Alice" } }\n` +
      `\n` +
      `const deleted = await DB.delete("user3");\n` +
      `console.log(deleted); // false\n` +
      `\n` +
      `// After: Database remains unchanged (key didn't exist)\n` +
      `// DB: { "user1": { id: "user1", name: "Alice" } }`,
  },
  {
    name: "getMany()",
    description:
      "Batch fetch multiple values. Returns array where missing keys yield null",
    signature: "getMany(keys: string[]): Promise<(T | null)[]>",
    category: "Read",
    icon: readIcon,
    example:
      `// Before: Database contains user1 but not user3\n` +
      `// DB: { "user1": { id: "user1", name: "Alice" } }\n` +
      `\n` +
      `const users = await DB.getMany(["user1", "user3"]);\n` +
      `console.log(users); // [ { id: "user1", name: "Alice" }, null ]\n` +
      `\n` +
      `// After: Database remains unchanged (read operation)`,
  },
  {
    name: "setMany()",
    description: "Batch set multiple entries. Returns array of stored values",
    signature: "setMany(data: { key: string; value: T }[]): Promise<T[]>",
    category: "Write",
    icon: writeIcon,
    example:
      `// Before: Database is empty or doesn't contain user2 and user3\n` +
      `// DB: {}\n` +
      `\n` +
      `const users = await DB.setMany([\n` +
      `  { key: "user2", value: { id: "user2", name: "Bob" } },\n` +
      `  { key: "user3", value: { id: "user3", name: "Charlie" } }\n` +
      `]);\n` +
      `console.log(users); // [ { id: "user2", name: "Bob" }, { id: "user3", name: "Charlie" } ]\n` +
      `\n` +
      `// After: Database contains both new entries\n` +
      `// DB: { "user2": { id: "user2", name: "Bob" }, "user3": { id: "user3", name: "Charlie" } }`,
  },
  {
    name: "deleteMany()",
    description:
      "Batch delete entries. Returns array of booleans indicating success/failure for each key",
    signature: "deleteMany(keys: string[]): Promise<boolean[]>",
    category: "Delete",
    icon: deleteIcon,
    example:
      `// Before: Database contains user2 and user3\n` +
      `// DB: { "user2": { id: "user2", name: "Bob" }, "user3": { id: "user3", name: "Charlie" } }\n` +
      `\n` +
      `const results = await DB.deleteMany(["user2", "user3"]);\n` +
      `console.log(results); // [ true, true ]\n` +
      `\n` +
      `// After: Database is empty (both entries deleted)\n` +
      `// DB: {}`,
  },
  {
    name: "push()",
    description:
      "Push an element into the array at the specified key. Returns object with the added element and new array length",
    signature:
      "push(key: string, value: ArrayElement<T>): Promise<{ length: number; element: ArrayElement<T> }>",
    category: "Array Operation",
    icon: writeIcon,
    example:
      `// Before: Database entry contains an array\n` +
      `// DB: { "logs": ["a", "b", "c", "d"] }\n` +
      `\n` +
      `const result = await DB.push("logs", "e");\n` +
      `console.log(result); // { element: "e", length: 5 }\n` +
      `\n` +
      `// After: Element added to end of array\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }`,
  },
  {
    name: "unshift()",
    description:
      "Unshift an element into the array at the start. Returns object with the added element and new array length",
    signature:
      "unshift(key: string, value: ArrayElement<T>): Promise<{ length: number; element: ArrayElement<T> }>",
    category: "Array Operation",
    icon: writeIcon,
    example:
      `// Before: Database entry contains an array\n` +
      `// DB: { "logs": ["b", "c", "d", "e"] }\n` +
      `\n` +
      `const result = await DB.unshift("logs", "a");\n` +
      `console.log(result); // { element: "a", length: 5 }\n` +
      `\n` +
      `// After: Element added to start of array\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }`,
  },
  {
    name: "pop()",
    description:
      "Remove and return the last element of the array. Returns object with the removed element and new array length",
    signature:
      "pop(key: string): Promise<{ length: number; element: ArrayElement<T> }>",
    category: "Array Operation",
    icon: deleteIcon,
    example:
      `// Before: Database entry contains an array\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }\n` +
      `\n` +
      `const result = await DB.pop("logs");\n` +
      `console.log(result); // { element: "e", length: 4 }\n` +
      `\n` +
      `// After: Last element removed from array\n` +
      `// DB: { "logs": ["a", "b", "c", "d"] }`,
  },
  {
    name: "shift()",
    description:
      "Remove and return the first element of the array. Returns object with the removed element and new array length",
    signature:
      "shift(key: string): Promise<{ length: number; element: ArrayElement<T> }>",
    category: "Array Operation",
    icon: deleteIcon,
    example:
      `// Before: Database entry contains an array\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }\n` +
      `\n` +
      `const result = await DB.shift("logs");\n` +
      `console.log(result); // { element: "a", length: 4 }\n` +
      `\n` +
      `// After: First element removed from array\n` +
      `// DB: { "logs": ["b", "c", "d", "e"] }`,
  },
  {
    name: "slice()",
    description:
      "Get a slice of the array between start and end indices. Returns array slice or null if key doesn't exist",
    signature:
      "slice(key: string, start: number, end?: number): Promise<ArrayElement<T>[] | null>",
    category: "Array Operation",
    icon: readIcon,
    example:
      `// Before: Database entry contains an array\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }\n` +
      `\n` +
      `const logs = await DB.slice("logs", 0);\n` +
      `console.log(logs); // ["a", "b", "c", "d", "e"]\n` +
      `\n` +
      `const lastTwoLogs = await DB.slice("logs", -2);\n` +
      `console.log(lastTwoLogs); // ["d", "e"]\n` +
      `\n` +
      `const firstTwoLogs = await DB.slice("logs", 0, 2);\n` +
      `console.log(firstTwoLogs); // ["a", "b"]\n` +
      `\n` +
      `// After: Database remains unchanged (read operation)\n` +
      `// DB: { "logs": ["a", "b", "c", "d", "e"] }`,
  },
];

function T(method: {
  name: string;
  example: string;
  category: string;
  icon: JSX.Element;
  signature: string;
  description: string;
}) {
  const card = (
    <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-slate-100 mb-6">
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

export default function DatabaseMethods() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMethods = methods.filter((method) =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {heading}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features}
      </div>

      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for method/s . . ."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl shadow-sm outline-none  text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredMethods.length > 0 ? (
        filteredMethods.map(T)
      ) : (
        <p className="text-center text-slate-500">No matching methods found.</p>
      )}
    </div>
  );
}
