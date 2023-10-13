import useProjects from "../hooks/useProjects";
import ProjecPreview from "../components/ProjecPreview";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectsSkeletor from "../skeletors/ProjectsSkeletor";

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
const Projects = () => {
  const { projects, getProjects } = useProjects();
  const [charging, setCharging] = useState(false);
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1 className="text-white font-black text-2xl md:text-4xl mb-3">
        Projects
      </h1>
      {projects.length ? (
        (setInterval(() => {
          setCharging(true);
        }, 500),
        charging ? (
          <motion.ul
            className="container grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 w-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.li key={project._id} variants={item}>
                <ProjecPreview key={project._id} project={project} />
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="animate-pulse gray-300 rounded-md p-4 w-full mx-auto">
            <div className=" flex space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 ">
                  {projects.map((project) => (
                    <div key={project._id} className=" h-44 space-y-2 rounded">
                      <ProjectsSkeletor />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className=" text-center text-gray-600 uppercase  p-5">
          There are no projects yet
        </p>
      )}
    </>
  );
};

export default Projects;
