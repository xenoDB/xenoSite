import useScrollRestoration from "../hooks/RetainScroll";
import CodeBlock from "../utilities/CodeBlock";
import { FaClock, FaDatabase, FaFile, FaHardDrive } from "react-icons/fa6";
import { TbLogs } from "react-icons/tb";

const heading = (
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
      <FaHardDrive className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
      Storage & Logs
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
      Understand XenoDB's efficient storage architecture, intelligent sharding
      system, and comprehensive logging for data recovery.
    </p>
  </div>
);

const features = [
  {
    icon: FaDatabase,
    title: "Intelligent Sharding",
    description:
      "Distribute data into 100-key JSON shards for peak performance.",
  },
  {
    icon: FaFile,
    title: "Index Management",
    description:
      "Quick key lookups with index.json mapping files to their keys.",
  },
  {
    icon: FaClock,
    title: "Operation Logging",
    description:
      "Detailed CSV logs for audit trails, data recovery, and automatic replay support.",
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
          <div className="w-7 h-7 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-2">
            <Icon className="w-5 h-5 text-orange-600" />
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

const indexCard = (
  <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
    <div className="w-full">
      <h4 className="flex font-semibold text-blue-800 mb-1 gap-2">
        <TbLogs className="w-5 h-5 text-blue-600 mt-0.5" />
        index.json
      </h4>
      <div className="text-blue-700 text-sm">
        Maps data files to their contained keys for fast lookups
      </div>
      <CodeBlock
        code={
          `{\n` +
          `  "data_1.json": ["K1". . ."K100"],\n` +
          `  "data_2.json": ["K101". . ."K200"],\n` +
          `  . . . \n` +
          `}\n`
        }
        transparent
        language="json"
        id="storage-structure"
      />
    </div>
  </div>
);

const dataCard = (
  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
    <div className="w-full">
      <h4 className="flex font-semibold text-green-800 mb-1 gap-2">
        <TbLogs className="w-5 h-5 text-green-600 mt-0.5" />
        data_*.json
      </h4>
      <div className="text-green-700 text-sm">
        Shard files containing up to 100 key-value pairs each
      </div>
      <CodeBlock
        code={
          `{\n` +
          `  "P1": { "level": "1", "xp": "5" },\n` +
          `  "P2": { "level": "2", "xp": "31" }\n` +
          `  . . .\n` +
          `}`
        }
        transparent
        language="json"
        id="storage-structure"
      />
    </div>
  </div>
);

const logsCard = (
  <div className="flex items-start space-x-3 p-4 md:col-span-2 bg-purple-50 border border-purple-200 rounded-xl">
    <div className="w-full">
      <h4 className="flex font-semibold text-purple-800 mb-1 gap-2">
        <TbLogs className="w-5 h-5 text-purple-600 mt-0.5" />
        logs.csv
      </h4>
      <div className="text-purple-700 text-sm">
        Operation history for recovery and audit purposes
      </div>

      <CodeBlock
        code={
          `  Timestamp,	               RequestId,	          Method,	    Key,	   Value	\n` +
          `1752780279370, 	621333de-8148-48c5-af73-9ff83ad1c446,  	ALL,\n` +
          `1752780279373, 	fc6f5e60-456d-4aed-bb39-caa791f177e7,  	HAS,    	test,\n` +
          `1752780279374, 	2c486f0c-9e28-40b7-848f-d2fd48a7cca2,  	GET,    	test,\n` +
          `1752780279380, 	65e2fc8c-91af-4c8a-a6a0-f174078d0adb,  	SET,    	test,  	   "test"\n`
        }
        transparent
        language="csv"
        id="storage-structure"
      />
    </div>
  </div>
);

const storageStructure = (
  <div className="flex-1 overflow-auto rounded-md md:col-span-2 border border-slate-200 bg-slate-100">
    <CodeBlock
      code={
        `storage/\n` +
        `└─ path/to/storage/\n` +
        `    ├─ index.json      ->  maps files to keys (data_*.json -> [keys])\n` +
        `    ├─ data_1.json     ->  { key1: {...}, key2: {...} ... key100: {...} }\n` +
        `    ├─ data_2.json     ->  { key101: {...}, key102: {...} ... key200: {...} }\n` +
        `    ├─ data_3.json     ->  { key201: {...}, key202: {...} ... key300: {...} }\n` +
        `    ├─ . . . . . . . . . . . . .\n` +
        `    └─ logs.csv        ->  operation history (CSV format);`
      }
      transparent
      language="text"
      id="storage-structure"
    />
  </div>
);

const storage = (
  <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-slate-100 mb-12">
    <h2 className="text-2xl font-bold text-slate-800 mb-2">
      Sharding and structure :
    </h2>

    <p className="text-slate-600 text-sm mb-6">
      XenoDB automatically distributes data across multiple JSON files, with
      each shard containing up to 100 keys for optimal performance.
    </p>

    <div className="flex gap-1 md:items-center flex-col sm:flex-row mb-2">
      <h3 className="font-bold text-slate-700 ">Data File (data_*.json)</h3>
      <p className="text-slate-600 text-sm">
        Each data file contains the actual key-value pairs, stored as JSON
        objects for easy parsing and human readability.
      </p>
    </div>

    <div className="flex gap-1 md:items-center flex-col sm:flex-row mb-6">
      <h3 className="font-bold text-slate-700 ">Index File (index.json)</h3>
      <p className="text-slate-600 text-sm">
        The index maintains a mapping of data files to their contained keys,
        enabling fast key lookups without scanning all files.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {storageStructure}
      {indexCard}
      {dataCard}
      {logsCard}
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
            Logs older than 7 days are automatically purged. These logs are used
            by the RecoveryEngine
          </li>
          <li>
            RecoveryEngine runs on server startup which replays the last 500 (
            WRITE / DELETE ) operations
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function StorageLayout() {
  useScrollRestoration();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {heading}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features}
      </div>

      {storage}

      {info}
    </div>
  );
}
