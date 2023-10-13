import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom";

const ProjectForm = () => {
  const { submitProject, project } = useProjects();
  const [id, setId] = useState(null);
  const [nameProject, setNameProject] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [client, setClient] = useState("");

  const params = useParams();

  const currentDate = new Date().toISOString().split("T")[0];
  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setNameProject(project.nameProject);
      setDescription(project.description);
      setDeadline(project.deadline?.split("T")[0]);
      setClient(project.client);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const validClient = /^[A-Z][a-zA-Z-' ]{1,29}$/.test(client);
    if ([nameProject, description, deadline, client].includes("")) {
      toast.error("All fields are required for to create a project");
      return;
    }
    if (deadline < currentDate) {
      toast.error("You cannot select a date earlier than the current one");
      return;
    }
    if (!validClient) {
      toast.error("The client name is not valid");
      return;
    }
    submitProject({ id, nameProject, description, deadline, client });
    setId(null);
    setNameProject("");
    setDescription("");
    setDeadline("");
    setClient("");
  };
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="md:w-4/5"
    >
      <form
        className="backdrop-blur-sm bg-white/10 rounded-xl py-2 px-7"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nameProject"
            className="uppercase text-white block text-xl font-bold"
          >
            Project Name
          </label>
          <input
            id="nameProject"
            type="text"
            placeholder="Project Name"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            value={nameProject}
            onChange={(e) => {
              setNameProject(e.target.value);
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
            placeholder="Project Description"
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
            htmlFor="client"
            className="uppercase text-white block text-xl font-bold"
          >
            Client Name
          </label>
          <input
            type="text"
            name="client"
            id="client"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            placeholder="Client Name"
            value={client}
            onChange={(e) => {
              setClient(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value={id ? `Update Project` : "Create Project"}
          className="uppercase bg-emerald-700 text-white py-2 rounded-xl w-full font-bold hover:bg-emerald-500 cursor-pointer transition-colors mb-5"
        />
      </form>
    </motion.div>
  );
};

export default ProjectForm;
