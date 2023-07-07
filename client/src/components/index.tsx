import { useLocation, useNavigate } from 'react-router-dom';
import { Device, Integration, UpdateIntegration } from '../lib/types';
import { updateIntegration, deleteIntegration } from '../redux/slices/Session';
import { AppDispatch } from '../redux/store/index';
import { useDispatch, useSelector } from 'react-redux';

export function DeviceCard(props: Device) {
	return (
		<>
			<div className="card shadow-lg w-fit bg-base-300 rounded-box  hover:shadow-xl hover:scale-105 transform transition-all duration-500 m-4 hover:bg-base-100">
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

					<h3 className="card-title underline">Actions</h3>

					<p>???</p>

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

							{/* sya the amount missing */}

							<button
								className="btn btn-ghost btn-square btn-md"
								type="button"
								aria-label="Show More"
							>
								{props.actions.smartthings.devices.length > 1
									? `+${
											props.actions.smartthings.devices
												.length - 1
									  }`
									: `+${props.actions.smartthings.devices.length}`}{' '}
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
					<div className="card-actions">
						<button className="btn btn-primary">
							Try In Playground
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export function IntegrationGrid() {
	const integrations = useSelector(
		(state: any) => state.session.integrations
	);
	// convert to array of objects
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
					  ))
					: null}
			</div>
		</>
	);
}

export function DetailIntegrationView() {
	const dispatch = useDispatch<AppDispatch>();

	const integrations = useSelector(
		(state: any) => state.session.integrations
	);
	const navigate = useNavigate();
	const integrationName = window.location.pathname
		.split('/')[2]
		.replace(/%20/g, ' ');

	const integration = integrations.find(
		(integration: any) => integration.integrationName === integrationName
	);

	const updateIntegrationEvent = async (e: any) => {
		e.preventDefault();
		console.log('update integration event');

		const payload: Integration = {
			userId: integration.userId,
			integrationName,
			signal: integration.signal,
			actions: integration.actions
		};

		const integrationPayload: UpdateIntegration = {
			id: 'asdf',
			integration: payload
		};

		try {
			await dispatch(updateIntegration(integrationPayload));
		} catch (error) {
			console.log(error);
		}
	};

	const deleteIntegrationEvent = async (e: any) => {
		e.preventDefault();
		console.log('delete integration event');

		const id = 'asdf';

		try {
			await dispatch(deleteIntegration(id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 gap-4 w-full m-6">
					<form className="flex flex-col space-y-4">
						<h2 className="text-4xl font-bold text-white my-6 underline">
							{integrationName}
						</h2>

						<h1 className="text-3xl font-bold pb-4">Signal</h1>

						<input
							type="text"
							id="signal"
							onChange={() => null}
							value={integration.signal}
							className="border border-gray-300 rounded-md p-2"
						/>

						<h1 className="text-3xl font-bold pb-4 pt-8">
							Actions
						</h1>

						<input
							type="text"
							id="actions"
							value={'???'}
							onChange={() => null}
							className="border border-gray-300 rounded-md p-2"
						/>

						<div className="flex flex-row justify-start gap-4 items-baseline">
							<h1 className="text-3xl font-bold pb-4 pt-8">
								Devices
							</h1>

							<button
								title="Add Device"
								className="btn btn-circle btn-outline btn-xs"
								type="button"
								aria-label="Add Device"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</button>
						</div>

						<div className="grid grid-cols-5 gap-4 w-full m-6">
							{integration.actions.smartthings.devices.map(
								(device: Device) => (
									<div key={device.deviceId}>
										<DeviceCard {...device} />
									</div>
								)
							)}
						</div>

						<div className="card-actions">
							<button
								className="btn btn-primary"
								type="submit"
								onClick={() => navigate('/playground')}
							>
								Try In Playground
							</button>
							<button
								className="btn btn-success"
								onClick={updateIntegrationEvent}
							>
								Update
							</button>
							<button
								className="btn btn-error"
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
