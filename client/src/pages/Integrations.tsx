import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IntegrationGrid } from '../components';
import IntModal from '../components/modals/IntModal';
import { integrationsByUser } from '../redux/slices/Session';
import { AppDispatch } from '../redux/store/index';

const Integrations = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: any) => state.session.user);
	const location = useLocation();
	const hasChildRoute = location.pathname.includes('/integrations/');

	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, [user, navigate]);

	useEffect(() => {
		dispatch(integrationsByUser(user.id));
	}, [dispatch, user]);

	return (
		<>
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
								<IntegrationGrid />
							</div>
						</>
					)}
				</div>
				<Outlet />
			</div>
		</>
	);
};

export default Integrations;
