import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DetailIntegrationView } from './components';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Integrations from './pages/Integrations';
import Landing from './pages/Landing';
import Playground from './pages/Playground';
function App() {
	const [activeTab, setActiveTab] = useState<string>('');
	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<>
			<BrowserRouter>
				<Navbar
					activeTab={activeTab}
					handleTabClick={handleTabClick}
					setTab={setActiveTab}
				/>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/integrations" element={<Integrations />}>
						<Route
							path="/integrations/:name"
							element={<DetailIntegrationView />}
						/>
					</Route>
					<Route path="/playground" element={<Playground />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
