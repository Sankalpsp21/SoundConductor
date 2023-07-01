import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Integrations from "./pages/Integrations";
import Landing from "./pages/Landing";
import Playground from "./pages/Playground";
function App() {

  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar activeTab={activeTab} handleTabClick={handleTabClick}/>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
