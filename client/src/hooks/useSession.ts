import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slices/Session";
import { AppDispatch } from "../redux/store/index";

const useSession = (id: string) => {
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState({ id: id });
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!user.id) {
      dispatch(getUser(user.id))
        .then((response) => {
          if (isMounted.current) {
            setIntegrations(response.payload.integrations);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (isMounted.current) {
            setError(true);
            setLoading(false);
          }
          console.log(error);
        });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted.current = false;
    }
  }, [user.id]);

  return { user, setUser, integrations, setIntegrations, loading, error };
};

export default useSession;
