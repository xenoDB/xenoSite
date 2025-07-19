import { SiNpm } from "react-icons/si";
import { Link } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#FFFFFF] to-[#DBEAFECC] text-white py-2">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div className="flex flex-row gap-4">
          <p className="text-center text-[#444444]">
            <strong className="flex items-center gap-2">
              <span className="text-[20px]">&copy;</span> 1sT-Services (
              {new Date().getFullYear()})
            </strong>
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <Link to="https://www.npmjs.com/org/xenodb" target="_blank">
            <SiNpm className="text-[#CB0000EE] text-2xl" />
          </Link>
          <Link to="https://www.github.com/xenodb" target="_blank">
            <FaGithubSquare className="text-[#333333EE] text-2xl" />
          </Link>
          <Link to="https://discord.gg/1st-952570101784281139" target="_blank">
            <IoLogoDiscord className="text-[#5663F2EE] text-2xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
