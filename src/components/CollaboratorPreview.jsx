/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useProjects from "../hooks/useProjects";

const CollaboratorPreview = ({ collaborator }) => {
  const { handleModalDeleteCollaborator } = useProjects();
  const { nameUser, email } = collaborator;
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="backdrop-blur-sm bg-white/10 rounded-xl p-5 h-65 md:h-45  "
    >
      <div className="mb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-1xl text-white font-bold">{nameUser} </p>
            <p className="text-sm text-gray-400">{email} </p>
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              data-tooltip-id="deleteCollaborator"
              data-tooltip-content="Delete Collaborator"
              data-tooltip-place="top"
              onClick={() => {
                handleModalDeleteCollaborator(collaborator);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white hover:text-red-500 transition-colors hover:animate-pulse"
              >
                <path d="M10.375 2.25a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25zM10.375 12a7.125 7.125 0 00-7.124 7.247.75.75 0 00.363.63 13.067 13.067 0 006.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 00.364-.63l.001-.12v-.002A7.125 7.125 0 0010.375 12zM16 9.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
              </svg>
              <Tooltip id="deleteCollaborator" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollaboratorPreview;
