import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../redux/slices/Session";
import { AppDispatch } from "../redux/store/index";

const Auth = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || token.length === 0) {
      return;
    }

    const y = await dispatch(createNewUser(token));

    if (y.meta.requestStatus === "rejected") {
      return;
    }

    navigate("/home");
  };

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse p-48">
          <div className="text-center lg:text-left m-12">
            <h1 className="text-5xl font-bold">
              Begin Your Journey with SoundConductor
            </h1>
            <p className="py-6">Put instructions here</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Token</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Token Here"
                    className="input input-bordered"
                    onChange={(e) => setToken(e.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Enter SoundConductor
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
