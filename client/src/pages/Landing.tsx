import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Welcome To SoundConductor</h1>
            <p className="py-6 max-w-lg">
              SoundConductor is a smart sound classification tool that allows
              you to make your life easier.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
