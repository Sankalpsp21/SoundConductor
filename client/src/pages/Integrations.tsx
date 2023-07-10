/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IntegrationGrid } from '../components';
import IntModal from '../components/modals/IntModal';
import { integrationsByUser } from '../redux/slices/Session';
import { AppDispatch, RootState } from '../redux/store/index';

const Integrations = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.session.user);
	const location = useLocation();
	const hasChildRoute = location.pathname.includes('/integrations/');
	const hasUserId = useSelector((state: RootState) => state.session.user.id);
	const integrations = useSelector(
		(state: RootState) => state.session.integrations
	);

	useEffect(() => {
		if (!hasUserId) {
			navigate('/auth');
			// trigger a page refresh so the useEffect on that page gets triggered
			window.location.reload();
		}

		// fix over fetching here by finding out if this is the first mount of the component.
		dispatch(integrationsByUser(user.id));
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="container mx-auto">
				<div className="flex flex-col items-center justify-center">
					{!hasChildRoute && (
						<>
							<h1 className="text-5xl font-bold my-16">
								Integrations
							</h1>

							<div className="flex flex-row justify-center gap-4">
								<IntModal />
							</div>
							<div className="flex flex-row justify-center gap-4">
								<IntegrationGrid integrations={integrations} />
							</div>
						</>
					)}
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Integrations;
