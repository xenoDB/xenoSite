import useScrollRestoration from "../hooks/RetainScroll";
import CodeBlock from "../utilities/codeblock";
import {
  FaClock,
  FaDatabase,
  FaFile,
  FaHardDrive,
  FaShield,
} from "react-icons/fa6";

export default function StorageLayout() {
  useScrollRestoration();

  const storageStructure = `storage/
 └─ path/to/storage/
     ├─ index.json       # maps files to keys (data_*.json -> [keys])
     ├─ data_1.json      # { key1: {...}, key2: {...} ... key100: {...} }
     ├─ data_2.json      # { key101: {...}, key102: {...} ... key200: {...} }
     ├─ data_3.json      # { key201: {...}, key202: {...} ... key300: {...} }
     └─ logs.csv         # operation history (CSV format)`;

  const indexExample = `{
  "data_1.json": ["user1", "user2", "user3", ..., "user100"],
  "data_2.json": ["user101", "user102", "user103", ..., "user200"],
  "data_3.json": ["user201", "user202", "user203", ..., "user300"]
}`;

  const dataFileExample = `{
  "user1": {
    "id": "user1",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "createdAt": "2025-01-21T10:30:00Z"
  },
  "user2": {
    "id": "user2",
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "createdAt": "2025-01-21T11:15:00Z"
  },
  ...
}`;

  const logsExample = `Timestamp,RequestId,Method,Key,Value
2025-01-21T10:30:00.123Z,req_001,set,user1,"{""id"":""user1"",""name"":""Alice""}"
2025-01-21T10:30:15.456Z,req_002,get,user1,
2025-01-21T10:30:30.789Z,req_003,set,user2,"{""id"":""user2"",""name"":""Bob""}"
2025-01-21T10:31:00.012Z,req_004,delete,user1,
2025-01-21T10:31:15.345Z,req_005,setMany,"[""user3"",""user4""]","[{""id"":""user3""},{""id"":""user4""}]"`;

  const recoveryExample = `// Recovery Engine automatically:
// 1. Reads logs.csv on server startup
// 2. Replays operations to rebuild data files
// 3. Validates data integrity
// 4. Prunes logs older than 7 days

// Example recovery process:
console.log("Starting recovery...");
const operations = await readLogsFromCSV();
for (const op of operations) {
  await replayOperation(op);
}
console.log("Recovery complete!");`;

  const features = [
    {
      icon: FaDatabase,
      title: "Intelligent Sharding",
      description:
        "Automatically distributes data across multiple files with 100 keys per shard for optimal performance.",
    },
    {
      icon: FaFile,
      title: "Index Management",
      description:
        "Fast key lookups with index.json mapping keys to their respective data files.",
    },
    {
      icon: FaClock,
      title: "Operation Logging",
      description:
        "Complete audit trail with CSV-based logging for recovery and debugging purposes.",
    },
    {
      icon: FaShield,
      title: "Recovery Engine",
      description:
        "Automatic data recovery from operation logs with integrity validation and log pruning.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
          <FaHardDrive className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Storage & Logs
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Understand XenoDB's efficient storage architecture, intelligent
          sharding system, and comprehensive logging for data recovery.
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-orange-600" />
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

      {/* Storage Structure */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Storage Directory Structure
        </h2>
        <p className="text-slate-600 mb-6">
          XenoDB organizes data using a hierarchical file structure with
          intelligent sharding and comprehensive logging.
        </p>
        <CodeBlock
          code={storageStructure}
          language="text"
          id="storage-structure"
        />
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-800 mb-2">📄 index.json</h4>
            <p className="text-blue-700 text-sm">
              Maps data files to their contained keys for fast lookups
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2">
              🗃️ data_*.json
            </h4>
            <p className="text-green-700 text-sm">
              Shard files containing up to 100 key-value pairs each
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <h4 className="font-semibold text-purple-800 mb-2">📊 logs.csv</h4>
            <p className="text-purple-700 text-sm">
              Operation history for recovery and audit purposes
            </p>
          </div>
        </div>
      </div>

      {/* Sharding System */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Intelligent Sharding
        </h2>
        <p className="text-slate-600 mb-6">
          XenoDB automatically distributes data across multiple JSON files, with
          each shard containing up to 100 keys for optimal performance.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Index File (index.json)
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              The index maintains a mapping of data files to their contained
              keys, enabling fast key lookups without scanning all files.
            </p>
            <CodeBlock code={indexExample} language="json" id="index-example" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Data File (data_1.json)
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Each data file contains the actual key-value pairs, stored as JSON
              objects for easy parsing and human readability.
            </p>
            <CodeBlock
              code={dataFileExample}
              language="json"
              id="data-example"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
          <h4 className="font-semibold text-slate-800 mb-3">
            🚀 Sharding Benefits
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <ul className="space-y-2 text-slate-700">
              <li>
                • <strong>Fast Reads:</strong> Only load relevant data files
              </li>
              <li>
                • <strong>Efficient Writes:</strong> Update single shard instead
                of entire database
              </li>
              <li>
                • <strong>Memory Optimization:</strong> Load data on-demand
              </li>
            </ul>
            <ul className="space-y-2 text-slate-700">
              <li>
                • <strong>Scalability:</strong> Handles millions of keys
                efficiently
              </li>
              <li>
                • <strong>Parallel Processing:</strong> Multiple operations on
                different shards
              </li>
              <li>
                • <strong>Backup Friendly:</strong> Individual file-level
                backups
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logging System */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Operation Logging
        </h2>
        <p className="text-slate-600 mb-6">
          Every database operation is logged to a CSV file for audit trails,
          debugging, and data recovery purposes.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Log Format (logs.csv)
            </h3>
            <CodeBlock code={logsExample} language="csv" id="logs-example" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-800 mb-3">
                📋 Log Fields
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <strong>Timestamp:</strong> ISO 8601 format with milliseconds
                </li>
                <li>
                  <strong>RequestId:</strong> Unique identifier for each
                  operation
                </li>
                <li>
                  <strong>Method:</strong> Operation type (get, set, delete,
                  etc.)
                </li>
                <li>
                  <strong>Key:</strong> Target key(s) for the operation
                </li>
                <li>
                  <strong>Value:</strong> Data being stored (JSON-escaped)
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-semibold text-slate-800 mb-3">
                🔧 Log Management
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <strong>Append-Only:</strong> New operations added to end
                </li>
                <li>
                  <strong>Automatic Pruning:</strong> Logs older than 7 days
                  removed
                </li>
                <li>
                  <strong>Recovery Ready:</strong> Used for data restoration
                </li>
                <li>
                  <strong>Debugging Aid:</strong> Trace operation history
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Engine */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Recovery Engine
        </h2>
        <p className="text-slate-600 mb-6">
          XenoDB's recovery engine automatically reconstructs data from
          operation logs, ensuring data integrity and enabling disaster
          recovery.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Recovery Process
            </h3>
            <CodeBlock
              code={recoveryExample}
              language="typescript"
              id="recovery-example"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Recovery Features
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  ✅ Automatic Recovery
                </h4>
                <p className="text-green-700 text-sm">
                  Runs on server startup, no manual intervention required
                </p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🔍 Integrity Validation
                </h4>
                <p className="text-blue-700 text-sm">
                  Verifies data consistency after recovery operations
                </p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  🗑️ Log Pruning
                </h4>
                <p className="text-purple-700 text-sm">
                  Automatically removes logs older than 7 days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="font-semibold text-amber-800 mb-3">
            ⚡ Performance Considerations
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <ul className="space-y-1">
              <li>• Recovery time scales with log file size</li>
              <li>• Regular backups reduce recovery duration</li>
              <li>• Large databases may take several minutes</li>
            </ul>
            <ul className="space-y-1">
              <li>• Monitor log file growth in production</li>
              <li>
                • Consider periodic manual cleanups for high-traffic systems
              </li>
              <li>• Recovery runs in background, server remains responsive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
