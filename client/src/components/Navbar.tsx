/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeTab, handleTabClick }: { activeTab: string, handleTabClick: any }) => {
      const navigate = useNavigate();

      useEffect(() => {
            if (activeTab === 'Your Integrations') {
                  navigate('/integrations');
            } else if (activeTab === 'Home') {
                  navigate('/home');
            } else if (activeTab === 'Playground') {
                  navigate('/playground');
            }
      }, [activeTab]);

      return (
            <>
                  <div className="navbar bg-base-100">
                        <div className="navbar-start">
                              <a className="btn btn-ghost normal-case text-xl"
                                    onClick={() => {
                                          handleTabClick('');
                                          navigate('/home');
                                    }}
                              >SoundConductor</a>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                              <ul className="menu menu-horizontal px-1">
                                    <div className="tabs tabs-boxed">
                                          <a
                                                className={classNames('tab', { 'tab-active': activeTab === 'Your Integrations' })}
                                                onClick={() => handleTabClick('Your Integrations')}
                                          >
                                                Your Integrations
                                          </a>
                                          <a
                                                className={classNames('tab', { 'tab-active': activeTab === 'Playground' })}
                                                onClick={() => handleTabClick('Playground')}
                                          >
                                                Playground
                                          </a>
                                    </div>
                              </ul>
                        </div>
                        <div className="navbar-end">
                              <a className="btn"
                                    onClick={() => {
                                          localStorage.removeItem('token');
                                          handleTabClick('');
                                          navigate('/');
                                    }}
                              >End Session</a>
                        </div>
                  </div>
            </>
      );
};

export default Navbar;
