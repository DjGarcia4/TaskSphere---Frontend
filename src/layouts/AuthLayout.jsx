import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 ">
          <div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
