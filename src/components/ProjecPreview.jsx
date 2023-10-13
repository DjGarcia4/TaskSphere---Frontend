/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "react-tooltip";

const ProjecPreview = ({ project }) => {
  const { nameProject, description, _id, client, creator, tasks } = project;
  const { auth } = useAuth();

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="relative"
    >
      <div className="backdrop-blur-sm bg-white/10 rounded-xl p-5 h-65 md:h-45 grid place-content-center">
        <div className="mb-3">
          <p className="text-white font-bold">{nameProject}</p>
          <span className="text-gray-400 uppercase">{client}</span>
          <p className="text-gray-500">{description}</p>
        </div>
        <Link
          to={`${_id}`}
          className="uppercase bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-500 cursor-pointer transition-colors p-2 grid place-items-center text-center text-xs"
        >
          View Project
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div
          data-tooltip-id="pendingTasks"
          data-tooltip-content="Pending Tasks"
          data-tooltip-place="top"
          className={`h-5 w-5 bg-red-500
          rounded-full grid place-content-center  justify-center animate-pulse absolute top-0 right-0`}
        >
          <p className="text-white text-xs">{tasks.length}</p>
        </div>
      ) : (
        ""
      )}
      <Tooltip id="pendingTasks" />
      {auth._id !== creator && (
        <p className="p-1 text-xs rounded-lg text-white bg-emerald-500 font-bold uppercase relative flex z-10 justify-end right-0 bottom-3">
          Collaborator
        </p>
      )}
    </motion.div>
  );
};

export default ProjecPreview;
