import { Link } from "react-router-dom";
import { useState } from "react";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";
import { motion } from "framer-motion";

import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const hableSubmit = async (e) => {
    e.preventDefault();
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    if (email === "") {
      toast.error("All fields are required for this form");
      return;
    }
    if (!validEmail) {
      toast.error("The email is not valid");
      return;
    }
    try {
      const { data } = await clientAxios.post(`/users/forget-password`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const { msg } = alert;
  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <h1 className="text-white font-black text-6xl">
        Recover your access and do not lose your{" "}
        <span className="text-emerald-500">Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        action=""
        onSubmit={hableSubmit}
        className="my-10 backdrop-blur-sm bg-white/10 rounded-md p-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-white block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Send Instructions"
          className="uppercase bg-emerald-500 text-white py-2 rounded-xl w-full font-bold hover:bg-emerald-700 cursor-pointer transition-colors mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center text-white my-5 uppercase underline hover:decoration-4"
        >
          Do you already have an account? Log in
        </Link>
        <Link
          to="/register"
          className="block text-center text-white my-5 uppercase underline hover:decoration-4"
        >
          Do not have an account? Sign up
        </Link>
      </nav>
    </motion.div>
  );
};

export default ForgetPassword;
