import { useState } from "react";
import { MenuIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import img from "../../assets/images2/image-avatar.png";
import { Link } from "react-router-dom";

interface Props {
  user: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ user = "John Doe" }) => {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <header className="fixed top-0 z-10 w-screen bg-white">
      <div className="flex items-center justify-between p-4 mx-auto border-gray-200 max-w-7xl sm:border-b">
        <div className="flex gap-6">
          <MenuIcon
            onClick={() => toggleSidebar(!isSidebarOpen)}
            className="w-8 h-8 text-gray-700 cursor-pointer md:hidden"
          />
          <Link to="/" className="text-3xl font-semibold text-gray-800">
            Bakery
          </Link>
          <Links location="navbar" />
        </div>
        <div className="flex items-center gap-4 text-gray-800">
          <div className="relative">
            <ShoppingCartIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
            <span className="absolute w-4 h-4 bg-red-400 rounded-full top-3 left-3"></span>
          </div>
          <div
            onClick={() => setOpenLogout(!openLogout)}
            className="relative flex items-center gap-3 cursor-pointer"
          >
            <p>John Doe</p>
            <img className="w-10 h-10" src={img} alt="Profile" />
            {openLogout && <LogoutMenu />}
          </div>
        </div>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

const Links = ({ location }: { location: string }) => (
  <ul
    className={`gap-4 text-gray-500 ${
      location === "sidebar"
        ? "mt-10 flex flex-col text-lg font-semibold"
        : " hidden justify-center sm:flex sm:items-end"
    }`}
  >
    <li className="cursor-pointer hover:underline">
      <Link to="/products">Our products</Link>
    </li>
    <li className="cursor-pointer hover:underline">
      <Link to="/">About</Link>
    </li>
    <li className="cursor-pointer hover:underline">
      <Link to="/">Contact us</Link>
    </li>
  </ul>
);
const LogoutMenu = () => (
  <div className="absolute left-0 p-4 px-8 bg-white rounded shadow-lg top-12">
    <p className="hover:underline ">Logout</p>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => (
  <>
    <div
      className={`absolute inset-0 z-50 h-screen bg-black/80 ${
        !isSidebarOpen && "-translate-x-full"
      }`}
    ></div>
    <nav
      className={`absolute top-0 left-0 z-50 h-screen w-10/12 ${
        !isSidebarOpen && "-translate-x-full"
      } bg-white p-8 shadow-lg transition-all duration-300 ease-in-out`}
    >
      <XIcon
        onClick={() => toggleSidebar(!isSidebarOpen)}
        className="w-8 h-8 text-gray-500 cursor-pointer"
      />
      <Links location="sidebar" />
    </nav>
  </>
);
export default Header;
