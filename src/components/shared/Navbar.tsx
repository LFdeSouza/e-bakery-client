import { useState } from "react";
import { MenuIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import img from "../../assets/images/image-avatar.png";

interface Props {
  user: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ user = "John Doe" }) => {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-gray-200 md:mx-auto md:max-w-7xl md:border-b">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex gap-6">
        <MenuIcon
          onClick={() => toggleSidebar(!isSidebarOpen)}
          className="w-8 h-8 text-gray-700 cursor-pointer md:hidden"
        />
        <a href="/" className="text-2xl text-gray-900">
          Bakery
        </a>
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
    </header>
  );
};

const LogoutMenu = () => (
  <div className="absolute left-0 p-4 px-8 bg-white rounded shadow-lg top-12">
    <p className="hover:underline ">Logout</p>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => (
  <>
    <div
      className={`absolute inset-0 z-40 bg-black/80 ${
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
      <ul className="flex flex-col gap-4 mt-10 text-gray-600">
        <li className="text-lg font-semibold cursor-pointer">
          <a href="/">Our products</a>
        </li>
        <li className="text-lg font-semibold cursor-pointer">
          <a href="/">Breads</a>
        </li>
        <li className="text-lg font-semibold cursor-pointer">
          <a href="/">Sweets</a>
        </li>
        <li className="text-lg font-semibold cursor-pointer">
          <a href="/">About</a>
        </li>
        <li className="text-lg font-semibold cursor-pointer">
          <a href="/">Contact us</a>
        </li>
      </ul>
    </nav>
  </>
);
export default Navbar;
