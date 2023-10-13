import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios(url);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmed(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);
  const { msg } = alert;
  return (
    <>
      <h1 className="text-white font-black text-6xl">
        Confirm your account and start creating your{" "}
        <span className="text-emerald-500">Projects</span>
      </h1>
      <div>
        {msg && <Alert alert={alert} />}
        {accountConfirmed && (
          <Link
            to="/"
            className="block text-center text-white my-5 uppercase underline hover:decoration-4"
          >
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
