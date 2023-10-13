import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AnimatedTextWord from "./AnimatedTextWord";

const Sidebar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-5 md:py-10">
      {location.pathname === "/projects" ? (
        // <p className="text-xl font-bold text-white">
        //   Hi: <span className="text-emerald-500">{auth.nameUser}</span> !
        // </p>
        <p className="text-xl font-bold text-white flex gap-1">
          Hi:
          <AnimatedTextWord text={auth.nameUser} />!
        </p>
      ) : (
        ""
      )}
      <Link
        to="create-project"
        className="uppercase w-30 text-center md:w-full bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-500 cursor-pointer transition-colors p-3 block mt-5"
      >
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
