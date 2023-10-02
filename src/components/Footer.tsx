import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-red-500 text-white mt-10 p-5">
      <div className="container mx-auto flex justify-center">
        <div className="flex items-center gap-3 text-white">
          <Icon width={28} icon="fontisto:shopping-bag" />
          <Link to="/">
            <div className="font-blinker font-bold text-2xl">Byte Mart</div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
