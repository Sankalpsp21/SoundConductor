/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import { Device, Integration } from '../lib/types';
import {
	deleteIntegration,
	integrationsByUser,
	updateSignal
} from '../redux/slices/Session';
import { AppDispatch, RootState } from '../redux/store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import DeviceModal from './modals/DeviceModal';

export function DeviceCard(props: Device) {
	return (
		<>
			<div className="card shadow-lg w-fit bg-base-300 rounded-box">
				<div className="card-body flex flex-col justify-center items-center">
					<h3 className="card-title underline">Device ID</h3>

					<p>{props.deviceId}</p>

					<h3 className="card-title underline">State</h3>

					<p>{props.state}</p>
				</div>
			</div>
		</>
	);
}

export function IntegrationCard(props: Integration) {
	const navigate = useNavigate();
	const location = useLocation();
	const handleClick = () => {
		if (location.pathname === '/integrations') {
			navigate(`/integrations/${props.integrationName}`);
		}
	};

	return (
		<>
			<div
				className="card shadow-lg bg-base-200 rounded-box  hover:shadow-xl hover:scale-105 transform transition-all duration-500 m-4 hover:bg-base-300"
				onClick={handleClick}
			>
				<div className="card-body flex flex-col justify-center items-center">
					<h3 className="card-title underline">Integration Name: </h3>

					<p>{props.integrationName}</p>

					<h3 className="card-title underline">Signal</h3>

					<p>{props.signal}</p>

					<h3 className="card-title">Devices</h3>
					{props.actions.smartthings.devices.length > 1 ? (
						<>
							{props.actions.smartthings.devices
								.flatMap((device: Device) => (
									<div key={device.deviceId}>
										<DeviceCard {...device} />
									</div>
								))
								.filter((_, index) => index < 1)}

							<button
								className="btn btn-ghost btn-square btn-md"
								type="button"
								aria-label="Show More"
							>
								{props.actions.smartthings.devices.length > 1
									? `+${
											props.actions.smartthings.devices
												.length - 1
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  }`
									: `+${props.actions.smartthings.devices.length}`}
								more
							</button>
						</>
					) : (
						<>
							{props.actions.smartthings.devices.map(
								(device: Device) => (
									<div key={device.deviceId}>
										<DeviceCard {...device} />
									</div>
								)
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}

interface GridProps {
	integrations: Integration[];
}

export function IntegrationGrid({ integrations }: GridProps) {
	const integrationArray = Object.keys(integrations).map(
		(key) => integrations[key]
	);

	return (
		<>
			<div className="grid grid-cols-3 gap-4 w-full m-6">
				{integrations
					? integrationArray?.map((integration: Integration) => (
							<IntegrationCard
								key={integration.integrationName}
								{...integration}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: null}
			</div>
		</>
	);
}

export function DetailIntegrationView() {
	const dispatch = useDispatch<AppDispatch>();

	const integrations = useSelector(
		(state: RootState) => state.session.integrations
	);
	const user = useSelector((state: RootState) => state.session.user);
	const navigate = useNavigate();
	const integrationName = window.location.pathname
		.split('/')[2]
		.replace(/%20/g, ' ');

	const integration: any = integrations.find(
		(integration: Integration) =>
			integration.integrationName === integrationName
	);

	const [signal, setSignal] = useState(integration.signal);

	useEffect(() => {
		dispatch(integrationsByUser(user.id));
	}, []);

	const updateIntegrationEvent = async (e: any) => {
		e.preventDefault();
		const payload = {
			integrationId: integration._id,
			signal: signal
		};
		await dispatch(updateSignal(payload));
		await dispatch(integrationsByUser(user.id));
	};

	const deleteIntegrationEvent = async (e: any) => {
		e.preventDefault();
		const payload = {
			integrationId: integration._id
		};
		navigate('/integrations');
		await dispatch(deleteIntegration(payload));
		await dispatch(integrationsByUser(user.id));
	};

	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 gap-4 w-full m-6">
					<form className="flex flex-col space-y-4">
						<h2 className="text-6xl font-bold text-white my-16 underline">
							{integrationName}
						</h2>

						<h1 className="text-5xl font-bold pb-4">Signal</h1>

						<input
							type="text"
							id="signal"
							onChange={(e) => setSignal(e.target.value)}
							value={signal}
							className="input input-bordered input-primary w-full max-w-xl"
						/>

						<div className="flex flex-row justify-start gap-4 items-baseline">
							<h1 className="text-5xl font-bold pb-4 pt-8">
								Devices In This Integration
							</h1>
							<DeviceModal />
						</div>

						<div className="grid grid-cols-8 gap-4 w-full m-6">
							{integration.actions.smartthings.devices.map(
								(device: Device) => (
									<div key={device.deviceId}>
										<DeviceCard {...device} />
									</div>
								)
							)}
						</div>

						<div className="card-actions flex flex-row justify-start gap-4 m-4 py-8 align-bottom">
							<button
								className="btn btn-primary btn-lg"
								type="submit"
								onClick={() => navigate('/playground')}
							>
								Try In Playground
							</button>
							<button
								className="btn btn-success btn-lg"
								type="submit"
								onClick={updateIntegrationEvent}
							>
								Update
							</button>
							<button
								className="btn btn-error btn-lg"
								onClick={deleteIntegrationEvent}
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
