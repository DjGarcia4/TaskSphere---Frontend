import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import useProjects from "../hooks/useProjects";
import ModalSearch from "./ModalSearch";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const { auth, logOut } = useAuth();
  const { handleSearch, closeSesionProjects } = useProjects();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <header
      className={`m-4 px-4 py-5 backdrop-blur-lg ${
        scrollY <= 200 ? "bg-white/10" : ""
      } rounded-xl sticky top-0 z-50`}
    >
      <ModalSearch />
      <div className="md:flex md:justify-between items-center">
        <Link to="/projects">
          <div className="flex justify-between">
            <h2 className="text-4xl text-white font-black">
              Task<span className="text-emerald-500">Sphere</span>
            </h2>
          </div>
        </Link>

        {/* <input
          type="search"
          placeholder="Search for Project"
          className={`block w-full md:w-96 rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 bg-gray-500 focus:bg-white transition-colors`}
        /> */}
        <div
          className={`flex mt-3 md:m-0 items-center justify-end md:justify-start gap-4`}
        >
          <button
            type="button"
            data-tooltip-id="searchProject"
            data-tooltip-content="Search Project"
            data-tooltip-place="top"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white hover:text-emerald-500 transition-colors hover:animate-pulse"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>

            <Tooltip id="searchProject" />
          </button>
          <Link to="/projects" className="font-bold uppercase text-white">
            Projects
          </Link>

          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-emerald-700 text-white py-2 rounded-xl font-bold hover:bg-emerald-500 cursor-pointer transition-colors p-3"
              type="button"
            >
              {auth.nameUser}
              <svg
                className={`w-2.5 h-2.5 ml-2.5 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                className="z-10 absolute right-0.5 mt-2   rounded-lg shadow w-full"
              >
                <button
                  className="flex justify-center bg-gray-500 text-white rounded-xl font-bold hover:bg-red-500 cursor-pointer transition-colors p-2 w-full"
                  type="button"
                  onClick={() => {
                    logOut();
                    closeSesionProjects();
                    localStorage.removeItem("token");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Log Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
