import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import clientAxios from "../config/clientAxios";
import { motion } from "framer-motion";
import Alert from "../components/Alert";
// import Alert from "../components/Alert";

const Register = () => {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState("");

  const hableSubmit = async (e) => {
    e.preventDefault();
    const validName = /^[A-Z][a-zA-Z-' ]{1,29}$/.test(nameUser);
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      password
    );
    if ([nameUser, email, password, password2].includes("")) {
      toast.error("All fields are required for this form");
      return;
    }
    if (!validName) {
      toast.error("The name is not valid");
      return;
    }
    if (!validEmail) {
      toast.error("The email is not valid");
      return;
    }
    if (password !== password2) {
      toast.error("The passwords do not match");
      return;
    }
    if (!validPassword) {
      toast.error(
        "The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    //To create the user in the API
    try {
      const { data } = await clientAxios.post(`/users`, {
        nameUser,
        password,
        email,
      });
      // toast(data.msg, { icon: "📨", duration: 50000 });
      setAlert({
        msg: data.msg,
        error: false,
      });

      setNameUser("");
      setEmail("");
      setPassword("");
      setPassword2("");
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
        Create your Account and Manage Your{" "}
        <span className="text-emerald-500">Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={hableSubmit}
        className="my-10 backdrop-blur-sm bg-white/10 rounded-md p-10"
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-white block text-xl font-bold"
          >
            Name
          </label>
          <input
            id="nameUser"
            type="text"
            placeholder="Your Name"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            value={nameUser}
            onChange={(e) => {
              setNameUser(e.target.value);
            }}
          />
        </div>
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
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-white block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-white block text-xl font-bold"
          >
            Repeat Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat your Password"
            className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Create your Account"
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
          to="/forget-password"
          className="block text-center text-white my-5 uppercase underline hover:decoration-4"
        >
          I forgot my password
        </Link>
      </nav>
    </motion.div>
  );
};

export default Register;
