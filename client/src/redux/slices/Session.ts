import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import {
	Integration,
	ExecuteIntegration,
	User,
	CreateDevice,
	UpdateSignal,
	DeleteIntegration
} from '../../lib/types';

const initialState: { user: User; integrations: Integration[] } = {
	user: {
		id: ''
	},
	integrations: []
};

export const executeIntegration = createAsyncThunk(
	'session/executeIntegration',
	async (integration: ExecuteIntegration, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${integration.userId}/execute`,
				{ signal: integration.signal }
			);
			//const response = await axios.post(`http://localhost:8000/integrations/${integration.userId}/execute`, { signal: integration.signal });
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const createNewUser = createAsyncThunk(
	'session/createNewUser',
	async (token: string, { rejectWithValue }) => {
		try {
			console.log('sending');
			const response = await axios.post(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/token`,
				{ token }
			);
			console.log('response');
			console.log(response);
			//const response = await axios.post(`http://localhost:8000/smartthings/token`, { token });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getSmartThingsDevices = createAsyncThunk(
	'session/getSmartThingsDevices',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/${userId}/devices`
			);
			//const response = await axios.get(`http://localhost:8000/smartthings/${userId}/devices`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createIntegration = createAsyncThunk(
	'session/createIntegration',
	async (integration: Integration, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations`,
				integration
			);
			//const response = await axios.post(`http://localhost:8000/integrations`, integration);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const integrationsByUser = createAsyncThunk(
	'session/integrationsByUser',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${userId}`
			);
			//const response = await axios.get(`http://localhost:8000/integrations/${userId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createDevice = createAsyncThunk(
	'session/createDevice',
	async (payload: CreateDevice, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.patch(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${id}`,
				payload
			);
			//const response = await axios.patch(`http://localhost:8000/integrations/${id}`, payload);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateSignal = createAsyncThunk(
	'session/updateSignal',

	async (payload: UpdateSignal, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.post(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${id}`,
				payload
			);
			//const response = await axios.patch(`http://localhost:8000/integrations/${id}`, payload);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteIntegration = createAsyncThunk(
	'session/deleteIntegration',
	async (payload: DeleteIntegration, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.delete(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${id}`
			);
			//const response = await axios.delete(`http://localhost:8000/integrations/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setUserId: (state, action) => {
			state.user.id = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(createNewUser.fulfilled, (state, action) => {
			state.user = { id: action.payload._id };
		});
		builder.addCase(createNewUser.rejected, (state) => {
			state.user = { ...state.user };
		});
		builder.addCase(getSmartThingsDevices.fulfilled, (_state, _action) => {
			// state.integrations = action.payload;
		});
		builder.addCase(getSmartThingsDevices.rejected, (_state) => {
			// state.integrations = [];
		});
		builder.addCase(createIntegration.rejected, (state) => {
			state.integrations = { ...state.integrations };
		});
		builder.addCase(integrationsByUser.fulfilled, (state, action) => {
			state.integrations = action.payload;
		});
		builder.addCase(integrationsByUser.rejected, (state) => {
			state.integrations = { ...state.integrations };
		});
		builder.addCase(PURGE, (state) => {
			state.user = initialState.user;
			state.integrations = initialState.integrations;
		});
	}
});

export const selectIntegrationByName = (name) => (state) => {
	return state.session.integrations.find(
		(integration) => integration.integrationName === name
	);
};

export const { setUserId } = sessionSlice.actions;

export default sessionSlice.reducer;
