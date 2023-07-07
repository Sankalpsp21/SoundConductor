import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/useSession";
import { setToken } from "../redux/slices/Session";
import { AppDispatch } from "../redux/store/index";

const Home = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.session.user);
  const { user: data } = useSession(user.id);

  // const fetchToken = async () => {
  // 	try {
  // 		const { data } = await axios.get(
  // 			`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/users/${user.id}/token`
  // 		);
  // 		dispatch(setToken(data.token));
  // 	} catch (error) {
  // 		console.error('API request error:', error);
  // 	}
  // };

  // useEffect(() => {
  // 	if (!user && !data) {
  // 		navigate('/');
  // 	}
  // 	fetchToken();
  // }, [user]);

  return (
    <>
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold my-16">Home Screen</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
