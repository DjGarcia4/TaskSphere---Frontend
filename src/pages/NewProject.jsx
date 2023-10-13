import ProjectForm from "../components/ProjectForm";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
const NewProject = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-white font-black text-2xl md:text-4xl ">
          Create Project
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
        <ProjectForm />
      </div>
    </>
  );
};

export default NewProject;
