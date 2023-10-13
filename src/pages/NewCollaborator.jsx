import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useProjects from "../hooks/useProjects";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCollaboratorSkeletor from "../skeletors/AddCollaboratorSkeletor";
import ColaboratorSearch from "../components/CollaboratorSearch";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const NewCollaborator = () => {
  const navigate = useNavigate();
  const { submitCollaborator, getProject, project, charging, collaborator } =
    useProjects();
  const params = useParams();
  const [email, setEmail] = useState("");
  useEffect(() => {
    getProject(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    if ([email].includes("")) {
      toast.error("All fields are required for this form");
      return;
    }
    if (!validEmail) {
      toast.error("The email is not valid");
      return;
    }
    submitCollaborator(email);
  };
  if (charging) return <AddCollaboratorSkeletor />;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-white font-black text-2xl md:text-4xl mb-3">
          Add a new collaborator to the project:{" "}
          <span className="text-emerald-500">{project.nameProject}</span>
        </h1>
        <button
          type="button"
          data-tooltip-id="goBack"
          data-tooltip-content="Go Back"
          data-tooltip-place="top"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white hover:text-emerald-500 hover:animate-pulse"
          >
            <path
              fillRule="evenodd"
              d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
              clipRule=""
            />
          </svg>
          <Tooltip id="goBack" />
        </button>
      </div>
      <div className="mt-3 md:flex justify-center">
        <motion.div
          initial={{ x: 1000 }}
          animate={{ x: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="md:w-3/5 "
        >
          <form
            action=""
            className="backdrop-blur-sm bg-white/10 rounded-xl py-2 px-7"
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label
                htmlFor="email"
                className="uppercase text-white block text-xl font-bold"
              >
                Email Collaborator
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email user"
                className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <input
              type="submit"
              value="Search for Collaborator"
              className="uppercase bg-emerald-700 text-white py-2 rounded-xl w-full font-bold hover:bg-emerald-500 cursor-pointer transition-colors mb-5"
            />
          </form>
        </motion.div>
      </div>
      <div className="mt-3 md:flex justify-center">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="md:w-3/5 "
        >
          {collaborator._id ? (
            <motion.li key={collaborator._id} variants={item} className="">
              <ColaboratorSearch collaborator={collaborator} />
            </motion.li>
          ) : (
            <motion.li className="text-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                className="text-white "
              >
                Here, the found users will be displayed
              </motion.div>
            </motion.li>
          )}
        </motion.ul>
      </div>
    </>
  );
};

export default NewCollaborator;
