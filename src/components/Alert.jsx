/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { motion } from "framer-motion";
const Alert = ({ alert }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`${
        alert.error ? "bg-red-500" : "fbg-emerald-500"
      }  text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}
    >
      {alert.msg}
    </motion.div>
  );
};

export default Alert;
