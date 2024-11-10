import { Link } from "react-router-dom";
import { IoHomeSharp, IoChatbubbles } from "react-icons/io5";
import { HiOutlineChatAlt2 } from "react-icons/hi"; // Import new icon for starting a chat
import { useAuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    console.log("Dark mode is", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <aside className='flex flex-col items-center min-w-12 sm:w-16 sticky top-0 left-0 h-screen py-8 overflow-y-auto border-r bg-glass'>
      <nav className='h-full flex flex-col gap-3'>
        <Link to='/' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
          <IoHomeSharp size={20} />
        </Link>

        {authUser && (
          <Link to='/likes' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <FaHeart size={22} />
          </Link>
        )}

        {authUser && (
          <Link to='/explore' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <MdOutlineExplore size={25} />
          </Link>
        )}

        {authUser && (
          <Link to='/chat' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <IoChatbubbles size={22} />
          </Link>
        )}

        {/* New Chat Button with Chat Icon */}
        {authUser && (
          <Link to='/new-chat' className='p-1.5 flex justify-center transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <HiOutlineChatAlt2 size={22} /> {/* Chat icon for starting a new chat */}
          </Link>
        )}

        {!authUser && (
          <Link to='/login' className='p-1.5 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <PiSignInBold size={25} />
          </Link>
        )}

        {!authUser && (
          <Link to='/signup' className='p-1.5 focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800'>
            <MdEditDocument size={25} />
          </Link>
        )}

        {authUser && (
          <div className='flex flex-col gap-2 mt-auto'>
            <Logout />
          </div>
        )}

        <button
          onClick={handleThemeToggle}
          className='p-1.5 mt-auto focus:outline-none transition-colors duration-200 rounded-lg hover:bg-gray-800'
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
