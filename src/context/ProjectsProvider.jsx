/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";

let socket;

const ProjectsContext = createContext();
const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [charging, setCharging] = useState(false);
  const [modalDeleteProject, setModalDeleteProject] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  const getProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios("/projects", config);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
  }, []);

  useEffect(() => {
    getProjects();
  }, [auth]);
  const submitProject = async (project) => {
    if (project.id) {
      await updateProject(project);
    } else {
      await createProject(project);
    }
  };
  const createProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/projects", project, config);
      setProjects([...projects, data]);
      toast.success(`Project ${data.nameProject} Succesfully Created`);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };
  const updateProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );
      const projectsUpdates = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(projectsUpdates);
      toast.success(`Project ${data.nameProject} Succesfully Updated`);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setCharging(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      toast.error(error.response.data.msg);
      navigate("/projects");
    } finally {
      setCharging(false);
    }
  };
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`projects/${id}`, config);
      const projectDeletes = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectDeletes);
      setModalDeleteProject(false);
      toast.success(data.msg);
      navigate("/projects");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleModalDeleteProject = () => {
    setModalDeleteProject(!modalDeleteProject);
  };

  const handleModalFormTask = () => {
    setTask({});
    setModalFormTask(!modalFormTask);
  };
  const submitTask = async (task) => {
    if (task.id) {
      await updateTask(task);
    } else {
      await createTask(task);
    }
  };
  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };
  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/tasks", task, config);
      toast.success(`Project ${data.nameTask} Succesfully Created`);
      handleModalFormTask();
      //*Socket.io
      socket.emit("newTask", data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const updateTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);
      socket.emit("updateTask", data);
      handleModalFormTask();
      toast.success(`Project ${data.nameTask} Succesfully Updated`);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      toast.success(data.msg);
      socket.emit("deleteTask", task);
      setModalDeleteTask(false);

      setTask({});
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const submitCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/collaborators`,
        { email },
        config
      );
      setCollaborator(data);
      toast.success("Collaborator Found");
    } catch (error) {
      setCollaborator({});
      toast.error(error.response.data.msg, {
        duration: 10000,
      });
    }
  };
  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        { email },
        config
      );
      setCollaborator({});
      navigate(-1);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleModalDeleteCollaborator = (collaborator) => {
    setCollaborator(collaborator);
    setModalDeleteCollaborator(!modalDeleteCollaborator);
  };

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/delete-collaborators/${project._id}`,
        { id: collaborator._id },
        config
      );
      toast.success(data.msg);
      setModalDeleteCollaborator(false);
      const projectUpdated = { ...project };
      projectUpdated.collaborators = projectUpdated.collaborators.filter(
        (collaboratorState) => collaboratorState._id !== collaborator._id
      );
      setProject(projectUpdated);
      setCollaborator({});
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const taskComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);
      socket.emit("stateTask", data);

      if (data.state) {
        toast.success(`Task ${data.nameTask} Succesfully Completed`);
      } else {
        toast.error(`Task ${data.nameTask} Incomplete`);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearch = () => {
    setSearchModal(!searchModal);
  };

  //*Socket.io
  const submitTasksProject = (task) => {
    const projectUpdated = { ...project };
    projectUpdated.tasks = [...projectUpdated.tasks, task];
    setProject(projectUpdated);
  };
  const submitTasksDeleted = (task) => {
    const projectUpdated = { ...project };
    projectUpdated.tasks = projectUpdated.tasks.filter(
      (taskState) => taskState._id !== task._id
    );
    setProject(projectUpdated);
  };
  const submitTasksUpdated = (task) => {
    const projectUpdated = { ...project };
    projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projectUpdated);
  };
  const submitStateTask = (task) => {
    const projecUpdated = { ...project };
    projecUpdated.tasks = projecUpdated.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(projecUpdated);
  };
  const closeSesionProjects = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  };

  return (
    <ProjectsContext.Provider
      value={{
        submitProject,
        projects,
        getProject,
        getProjects,
        project,
        charging,
        setCharging,
        deleteProject,
        handleModalDeleteProject,
        modalDeleteProject,
        handleModalFormTask,
        modalFormTask,
        submitTask,
        task,
        handleModalEditTask,
        handleModalDeleteTask,
        modalDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
        alert,
        taskComplete,
        handleSearch,
        searchModal,
        submitTasksProject,
        submitTasksDeleted,
        submitTasksUpdated,
        submitStateTask,
        closeSesionProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
