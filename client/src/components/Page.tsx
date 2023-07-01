/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageProps {
      activeTab: string;
      children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children, activeTab }) => {
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
                  <div className="container mx-auto">{children}</div>
            </>
      )
}

export default Page
