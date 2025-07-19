import { SiNpm } from "react-icons/si";
import { Link } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import { FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div className="flex flex-row gap-4">
          <Link to="/" className="flex items-center gap-2">
            <SiNpm className="text-red-500 text-2xl" />
            <span className="text-sm"> @xenodb/client</span>
            <span className="text-sm"> @xenodb/server</span>
          </Link>
        </div>
        <div className="container mx-auto px-4">
          <p className="text-center">
            &copy; {new Date().getFullYear()} XenoDB. All rights reserved.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/">
            <SiGithub className="text-2xl" />
          </Link>
          <Link to="/">
            <FaDiscord className="text-2xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
