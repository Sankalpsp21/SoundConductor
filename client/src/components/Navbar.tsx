/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../redux/store";

const Navbar = ({
  activeTab,
  handleTabClick,
  setTab,
}: {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (activeTab === "Your Integrations" && !location.pathname.includes("/integrations/")) {
      navigate("/integrations");
    } else if (activeTab === "Home") {
      navigate("/home");
    } else if (activeTab === "Playground") {
      navigate("/playground");
    } else if (activeTab === "") {
      console.log("location.pathname", location.pathname);
      switch (location.pathname) {
        case location.pathname.includes("/integrations") && location.pathname:
          setTab("Your Integrations");
          break;
        case location.pathname === "/home" && location.pathname:
          setTab("Home");
          break;
        case location.pathname === "/playground" && location.pathname:
          setTab("Playground");
          break;
        default:
          setTab("");
          break;
      }
    }
  }, [activeTab]);

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <a
            className="btn btn-ghost normal-case text-xl"
            onClick={() => {
              handleTabClick("");
              navigate("/home");
            }}
          >
            SoundConductor
          </a>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <div className="tabs tabs-boxed bg-base-300">
              <a
                className={classNames("tab", {
                  "tab-active": activeTab === "Your Integrations",
                })}
                onClick={() => handleTabClick("Your Integrations")}
              >
                Your Integrations
              </a>
              <a
                className={classNames("tab", {
                  "tab-active": activeTab === "Playground",
                })}
                onClick={() => handleTabClick("Playground")}
              >
                Playground
              </a>
            </div>
          </ul>
        </div>
        <div className="navbar-end">
          <a
            className="btn"
            onClick={() => {
              localStorage.removeItem("token");
              persistor.purge();
              handleTabClick("");
              navigate("/");
            }}
          >
            End Session
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
