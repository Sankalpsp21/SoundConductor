export interface User {
	id: string;
	token?: string;
}

export type Device = {
	deviceId: string;
	state: string;
};

export type SmartThingsAction = {
	devices: Device[];
};

export type Integration = {
	id?: string;
	userId: string;
	integrationName: string;
	signal: string;
	actions: {
		smartthings: SmartThingsAction;
	};
};

export type UpdateIntegration = {
	id: string;
	integration: Integration;
};

export type ExecuteIntegration = {
	userId: string;
	signal: string;
}
