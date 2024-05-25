import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const RootProtect = () => {
  const { auth, charging } = useAuth();
  const location = useLocation();
  if (charging) return "Cargando...";
  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <Toaster position="top-right" reverseOrder={false} />
          <div className="md:flex md:min-h-screen">
            {location.pathname === "/projects" && <Sidebar />}

            <main className="px-5 py-5 md:p-10 flex-1 mx-auto">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RootProtect;
