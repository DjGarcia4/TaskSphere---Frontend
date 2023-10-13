import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { motion } from "framer-motion";
import ProjectSkeletor from "../skeletors/ProjectSkeletor";
import ModalDeleteProject from "../components/ModalDeleteProjec";
import ModalFormTask from "../components/ModalFormTask";
import TaskPreview from "../components/TaskPreview";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ModalDeleteTask from "../components/ModalDeleteTask";
import CollaboratorPreview from "../components/CollaboratorPreview";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import Alert from "../components/Alert";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client";

let socket;

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
const Project = () => {
  const admin = useAdmin();
  const params = useParams();
  const navigate = useNavigate();
  const {
    getProject,
    project,
    charging,
    handleModalDeleteProject,
    handleModalFormTask,
    alert,
    submitTasksProject,
    submitTasksDeleted,
    submitTasksUpdated,
    submitStateTask,
  } = useProjects();
  useEffect(() => {
    getProject(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("openProject", params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    socket.on("taskAdded", (taskNew) => {
      if (taskNew.project === project._id) {
        submitTasksProject(taskNew);
      }
    });
    socket.on("taskDeleted", (taskDeleted) => {
      if (taskDeleted.project === project._id) {
        submitTasksDeleted(taskDeleted);
      }
    });
    socket.on("taskUpdated", (taskUp) => {
      if (taskUp.project._id === project._id) {
        submitTasksUpdated(taskUp);
      }
    });
    socket.on("taskComplete", (taskState) => {
      if (taskState.project._id === project._id) {
        submitStateTask(taskState);
      }
    });
  });
  const { nameProject, tasks } = project;
  const { msg } = alert;
  return !charging ? (
    msg ? (
      <Alert alert={alert} />
    ) : (
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
        }}
      >
        <ModalDeleteProject />
        <ModalFormTask />
        <ModalDeleteTask />
        <ModalDeleteCollaborator />
        <div className="w-full flex justify-end mb-3">
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

        <div className="flex justify-between items-center">
          <h1 className="text-white text-4xl font-black  mb-2">
            {nameProject}
          </h1>
          {admin && (
            <div className="md:flex gap-3">
              <Link
                to={`/projects/edit/${params.id}`}
                data-tooltip-id="editProject"
                data-tooltip-content="Edit Project"
                data-tooltip-place="top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 transition-colors hover:text-yellow-500 hover:animate-pulse"
                  color="white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                    clipRule="evenodd"
                  />
                  <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                  <path
                    fillRule="evenodd"
                    d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                <Tooltip id="editProject" />
              </Link>
              <button
                data-tooltip-id="deleteProject"
                data-tooltip-content="Delete Project"
                data-tooltip-place="top"
                type="button"
                onClick={handleModalDeleteProject}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-white hover:text-red-500 transition-colors hover:animate-pulse"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
                <Tooltip id="deleteProject" />
              </button>
            </div>
          )}
        </div>
        {admin && (
          <button
            type="button"
            className="uppercase bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-500 cursor-pointer transition-colors mb-5 py-2 px-5 flex gap-3 text-center"
            onClick={handleModalFormTask}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 "
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            New Task
          </button>
        )}

        <div className=" mb-4">
          <h2 className="text-white font-bold text-3xl mb-3">Project Tasks</h2>
          {tasks?.length ? (
            <motion.ul
              className="container grid gap-3 md:grid-cols-2 "
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {tasks.map((task) => (
                <motion.li key={task._id} variants={item}>
                  <TaskPreview key={task._id} task={task} />
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="backdrop-blur-sm bg-white/10 rounded-md p-10 text-center">
              <p className="text-gray-400">
                There are no tasks yet. If you add a task, it will be displayed
                here
              </p>
            </div>
          )}
        </div>
        {admin && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold text-3xl mb-3">
                Collaborators
              </h2>
              {admin && (
                <Link
                  to={`/projects/new-colaborator/${project._id}`}
                  type="button"
                  className="text-white font-bold text-1xl mb-3 hover:animate-pulse"
                  data-tooltip-id="addColaborator"
                  data-tooltip-content="Add Colaborator"
                  data-tooltip-place="top"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 transition-colors hover:text-emerald-500 hover:animate-pulse"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}

              <Tooltip id="addColaborator" />
            </div>
            <div>
              {project.collaborators?.length ? (
                <motion.ul
                  className="container grid gap-3 md:grid-cols-2 "
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {project.collaborators?.map((collaborator) => (
                    <motion.li key={collaborator._id} variants={item}>
                      <CollaboratorPreview
                        key={collaborator._id}
                        collaborator={collaborator}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="backdrop-blur-sm bg-white/10 rounded-md p-10 text-center">
                  <p className="text-gray-400">
                    There are no colaborators yet. If you add a colaborater, it
                    will be displayed here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    )
  ) : (
    <ProjectSkeletor />
  );
};

export default Project;
