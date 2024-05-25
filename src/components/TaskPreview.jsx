/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const TaskPreview = ({ task }) => {
  const { _id, nameTask, description, deadline, priority, state, completeBy } =
    task;
  const { handleModalEditTask, handleModalDeleteTask, taskComplete } =
    useProjects();
  const admin = useAdmin();
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
      {state ? (
        ""
      ) : (
        <div
          className={`h-3 w-3 ${
            priority === "Low"
              ? "bg-emerald-500"
              : priority === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          } rounded-full grid place-content-end animate-ping z-10 absolute top-0 right-0 `}
        ></div>
      )}
      <div className="backdrop-blur-sm bg-white/10 rounded-xl p-5 h-65 md:h-45 min-h-[210px] ">
        <div className="mb-3 ">
          <div className="flex justify-between items-center">
            <p className="text-2xl text-white font-bold">{nameTask}</p>
            <div className="flex gap-1">
              {state ? (
                completeBy._id === auth._id || admin ? (
                  <button
                    type="button"
                    data-tooltip-id="incompleteTask"
                    data-tooltip-content="Mark as Incomplete"
                    data-tooltip-place="top"
                    onClick={() => {
                      taskComplete(_id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white hover:text-orange-500 transition-colors hover:animate-pulse"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM9.75 14.25a.75.75 0 000 1.5H15a.75.75 0 000-1.5H9.75z"
                        clipRule="evenodd"
                      />
                      <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                    </svg>
                    <Tooltip id="incompleteTask" />
                  </button>
                ) : (
                  ""
                )
              ) : (
                <button
                  type="button"
                  data-tooltip-id="completeTask"
                  data-tooltip-content="Mark as Complete"
                  data-tooltip-place="top"
                  onClick={() => {
                    taskComplete(_id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white hover:text-emerald-500 transition-colors hover:animate-pulse"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                  </svg>
                  <Tooltip id="completeTask" />
                </button>
              )}
              {admin && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    data-tooltip-id="editTask"
                    data-tooltip-content="Edit Task"
                    data-tooltip-place="top"
                    onClick={() => {
                      handleModalEditTask(task);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white hover:text-yellow-500 transition-colors hover:animate-pulse"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                    <Tooltip id="editTask" />
                  </button>

                  <button
                    type="button"
                    data-tooltip-id="deleteTask"
                    data-tooltip-content="Delete Task"
                    data-tooltip-place="top"
                    onClick={() => {
                      handleModalDeleteTask(task);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white hover:text-red-500 transition-colors hover:animate-pulse"
                    >
                      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                      <path
                        fillRule="evenodd"
                        d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Tooltip id="deleteTask" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-400">{description}</p>
          <p className="text-gray-200 font-semibold">
            Deadline:
            <span className="text-gray-400 font-normal">
              {" "}
              {deadline.split("T")[0]}
            </span>
          </p>
          <p className="text-gray-200 font-semibold">
            Priority:{" "}
            <span
              className={`text-gray-400 font-normal ${
                priority === "Low"
                  ? "text-green-500"
                  : priority === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {priority}
            </span>
          </p>
        </div>
      </div>
      {state ? (
        <p
          className={`p-1 text-xs rounded-lg text-white bg-emerald-600 font-bold uppercase relative flex z-10 justify-end right-0 bottom-3`}
        >
          Complete by: {completeBy?.nameUser}
        </p>
      ) : (
        <p
          className={`p-1 text-xs rounded-lg text-white bg-red-500 font-bold uppercase relative flex z-10 justify-end right-0 bottom-3`}
        >
          Incomplete
        </p>
      )}
    </motion.div>
  );
};

export default TaskPreview;
