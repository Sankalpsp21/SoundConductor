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
  userId: string;
  integrationName: string;
  signal: string;
  actions: {
    smartthings: SmartThingsAction;
  };
};
