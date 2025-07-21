import { SiNpm } from "react-icons/si";
import { Link } from "react-router-dom";
import { BiCopyright } from "react-icons/bi";
import { FaGithubSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";

const iconSize = "text-2xl";
const iconAnimation = "hover:scale-125 transition-transform duration-150";
const iconStyles = `${iconSize} ${iconAnimation}`;

const leftElement = (
  <div className="flex gap-1 text-[#333333EE]">
    <BiCopyright className={iconSize} />
    <b>1sT-Services ({new Date().getFullYear()})</b>
  </div>
);

const rightElement = (
  <div className="flex gap-3">
    <Link to="https://npmjs.com/org/xenodb" target="_blank">
      <SiNpm className={`text-[#CB0000EE] ${iconStyles}`} />
    </Link>

    <Link to="https://github.com/xenodb" target="_blank">
      <FaGithubSquare className={`text-[#333333EE] ${iconStyles}`} />
    </Link>

    <Link to="https://discord.gg/1st-952570101784281139" target="_blank">
      <IoLogoDiscord className={`text-[#5663F2EE] ${iconStyles}`} />
    </Link>
  </div>
);

export default function Footer() {
  return (
    <footer className="py-2">
      <div className="flex justify-between items-center container mx-auto px-4">
        {leftElement}
        {rightElement}
      </div>
    </footer>
  );
}
