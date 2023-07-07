import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Integration } from '../../lib/types';
import { createIntegration } from '../../redux/slices/Session';
import { AppDispatch } from '../../redux/store/index';

type Device = {
	deviceId: string;
	state: string;
};

const IntModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [animationParent] = useAutoAnimate();
	const [animationChild] = useAutoAnimate({
		duration: 400,
		easing: 'linear'
	});
	const modalRef = useRef<HTMLDialogElement>(null);
	const userId = useSelector((state: any) => state.session.user.id);
	const [integrationName, setIntegrationName] = useState('');
	const dispatch = useDispatch<AppDispatch>();
	const [signal, setSignal] = useState('');
	const [devices, setDevices] = useState<Device[]>([]);

	const handleInputChange = (index: number, field: string, value: string) => {
		const updatedDevices = [...devices];
		updatedDevices[index][field] = value;
		setDevices(updatedDevices);
	};

	const handleClose = () => {
		setIsModalOpen(false);
		setDevices([]);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const payload: Integration = {
			userId,
			integrationName,
			signal,
			actions: { smartthings: { devices } }
		};

		console.log('payload', payload);

		try {
			await dispatch(createIntegration(payload));
			setIntegrationName('');
			setSignal('');
			setDevices([]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<button
				title="Add Integration"
				className="btn btn-circle btn-outline btn-xs"
				type="button"
				onClick={() => setIsModalOpen(true)}
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
			<dialog
				className="modal bg-base-350 rounded-md overflow-scroll fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[70%] "
				aria-labelledby="modal-title"
				aria-describedby="modal-descripto
                  "
				ref={modalRef}
				{...animationParent}
				open={isModalOpen}
			>
				<form
					className="modal-content  bg-base-300 p-4 rounded-md"
					{...animationParent}
					onSubmit={handleSubmit}
				>
					<div className="modal-header flex flex-row gap-2">
						<p className="text-xl font-bold">
							Create New Integration
						</p>
						<button
							onClick={handleClose}
							className="btn btn-sm btn-circle btn-ghost ml-auto focus:outline-none"
						>
							✕
						</button>
					</div>

					<div className="modal-body">
						<div className="flex flex-col space-y-4">
							<div
								onSubmit={handleSubmit}
								className="flex flex-col space-y-2 my-8"
							>
								<label
									htmlFor="userId"
									className="font-bold text-blue-500"
								>
									User ID:
								</label>
								<input
									type="text"
									id="userId"
									name="userId"
									value={userId || ''}
									disabled
									className="border border-gray-300 rounded-md"
								/>
								<label
									htmlFor="integrationName"
									className="font-bold text-blue-500"
								>
									Integration Name:
								</label>
								<input
									type="text"
									id="integrationName"
									name="integrationName"
									value={integrationName}
									onChange={(e) =>
										setIntegrationName(e.target.value)
									}
									className="border border-gray-300 rounded-md"
								/>
								<label
									htmlFor="signal"
									className="font-bold text-blue-500"
								>
									Signal:
								</label>
								<input
									type="text"
									id="signal"
									name="signal"
									value={signal}
									onChange={(e) => setSignal(e.target.value)}
									className="border border-gray-300 rounded-md"
								/>

								<div className="flex flex-row justify-start gap-2 py-4">
									<label
										htmlFor="devices"
										className="font-bold text-lg text-blue-500"
									>
										Devices:
									</label>
									<button
										title="Add Device"
										className="btn btn-circle btn-outline btn-xs"
										type="button"
										onClick={() =>
											setDevices([
												...devices,
												{ deviceId: '', state: '' }
											])
										}
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

								<div
									className="flex flex-col space-y-4"
									ref={animationChild}
								>
									{devices.map((_, index) => (
										<div
											className="flex flex-col space-y-2"
											key={index}
										>
											<div className="flex flex-row justify-start gap-2">
												<label
													htmlFor={`deviceId${index}`}
													className="font-bold text-blue-500"
												>
													Device ID {index + 1}:
												</label>
												<button
													className="btn btn-circle btn-outline btn-xs"
													type="button"
													onClick={() =>
														setDevices(
															devices.filter(
																(_, i) =>
																	i !== index
															)
														)
													}
													aria-label="Remove Device"
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
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</div>
											<input
												type="text"
												id="deviceId"
												name="deviceId"
												value={devices[index].deviceId}
												onChange={(e) =>
													handleInputChange(
														index,
														'deviceId',
														e.target.value
													)
												}
												className="border border-gray-300 rounded-md"
											/>
											<label
												htmlFor="state"
												className="font-bold text-blue-500"
											>
												State:
											</label>
											<input
												type="text"
												id="state"
												name="state"
												value={devices[index].state}
												onChange={(e) =>
													handleInputChange(
														index,
														'state',
														e.target.value
													)
												}
												className="border border-gray-300 rounded-md"
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="modal-footer flex flex-row gap-4">
						<button type="submit" className="btn btn-base">
							Submit
						</button>
						<button
							type="reset"
							className="btn btn-ghost"
							onClick={handleClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</dialog>
		</>
	);
};

export default IntModal;
