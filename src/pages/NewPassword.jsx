import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import toast from "react-hot-toast";
import clientAxios from "../config/clientAxios";
import { motion } from "framer-motion";

const NewPassword = () => {
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forget-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const hableSubmit = async (e) => {
    e.preventDefault();
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      password
    );
    if (password === "") {
      toast.error("All fields are required for this form");
      return;
    }
    if (!validPassword) {
      toast.error(
        "The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    try {
      const { data } = await clientAxios.post(
        `/users/forget-password/${token}`,
        { password }
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
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
        Reset your password and do not lose access to your{" "}
        <span className="text-emerald-500">Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          action=""
          onSubmit={hableSubmit}
          className="my-10 backdrop-blur-sm bg-white/10 rounded-md p-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-white block text-xl font-bold"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your New Password"
              className="w-full rounded-xl mt-3 p-3 border-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="uppercase bg-emerald-500 text-white py-2 rounded-xl w-full font-bold hover:bg-emerald-700 cursor-pointer transition-colors mb-5"
          />
        </form>
      )}
      {passwordModified && (
        <Link
          to="/"
          className="block text-center text-white my-5 uppercase underline hover:decoration-4"
        >
          Log In
        </Link>
      )}
    </motion.div>
  );
};

export default NewPassword;
