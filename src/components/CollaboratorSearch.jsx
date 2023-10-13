/* eslint-disable react/prop-types */
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import useProjects from "../hooks/useProjects";

const ColaboratorSearch = ({ collaborator }) => {
  const { nameUser, email } = collaborator;
  const { addCollaborator } = useProjects();
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="mt-4 w-full"
    >
      <h1 className="text-center text-white text-2xl font-bold">Results:</h1>
      <div className="backdrop-blur-sm bg-white/10 rounded-xl py-2 px-7 mt-2 ">
        <div className="flex justify-between">
          <p className="text-white font-medium">{nameUser}</p>
          <button
            type="button"
            data-tooltip-id="addCollaborator"
            data-tooltip-content="Add Collaborator"
            data-tooltip-place="top"
            onClick={() => {
              addCollaborator(email);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white hover:text-emerald-500 hover:animate-pulse"
            >
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>

            <Tooltip id="addCollaborator" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ColaboratorSearch;
