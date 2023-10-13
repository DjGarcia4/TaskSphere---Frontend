import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const PRIORITY = ["Low", "Medium", "High"];

const ModalFormTask = () => {
  const [id, setId] = useState(null);
  const [nameTask, setNameTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const params = useParams();
  const { modalFormTask, handleModalFormTask, submitTask, task } =
    useProjects();
  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    if (task?._id) {
      setId(task._id);
      setNameTask(task.nameTask);
      setDescription(task.description);
      setDeadline(task.deadline?.split("T")[0]);
      setPriority(task.priority);
      return;
    }
    setId(null);
    setNameTask("");
    setDescription("");
    setPriority("");
    setDeadline("");
  }, [task]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nameTask, description, priority].includes("")) {
      toast.error("All fields are required for to create a new task");
      return;
    }
    if (deadline < currentDate) {
      toast.error("You cannot select a date earlier than the current one");
      return;
    }
    submitTask({
      id,
      nameTask,
      description,
      priority,
      deadline,
      project: params.id,
    });
    setId(null);
    setNameTask("");
    setDescription("");
    setPriority("");
    setDeadline("");
  };
  return (
    <Transition.Root show={modalFormTask} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={handleModalFormTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block backdrop-blur-lg bg-white/10 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left w-full ">
                  <button className="w-full grid place-content-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-white hover:text-red-500 transition-colors hover:animate-pulse"
                      onClick={handleModalFormTask}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl leading-6 font-black text-white text-center"
                  >
                    {id ? "Update" : "Create"}
                    <span className="text-emerald-500"> Task</span>
                  </Dialog.Title>
                  <form
                    action=""
                    className=" rounded-xl py-2 px-7"
                    onSubmit={handleSubmit}
                  >
                    <div className="my-5">
                      <label
                        htmlFor="nameTask"
                        className="uppercase text-white block text-xl font-bold"
                      >
                        Task Name
                      </label>
                      <input
                        id="nameTask"
                        type="text"
                        placeholder="Task Name"
                        className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        value={nameTask}
                        onChange={(e) => {
                          setNameTask(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="description"
                        className="uppercase text-white block text-xl font-bold"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows="4"
                        className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="deadline"
                        className="uppercase text-white block text-xl font-bold"
                      >
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        min={currentDate}
                        id="deadline"
                        className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        value={deadline}
                        onChange={(e) => {
                          setDeadline(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-5">
                      <label
                        htmlFor="priority"
                        className="uppercase text-white block text-xl font-bold"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                        value={priority}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      >
                        <option value="">--SELECT--</option>
                        {PRIORITY.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value={id ? "Update Task" : "Create Task"}
                      className="uppercase bg-emerald-700 text-white py-2 rounded-xl w-full font-bold hover:bg-emerald-500 cursor-pointer transition-colors mb-5"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormTask;
