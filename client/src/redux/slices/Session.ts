import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import { Integration, UpdateIntegration, User } from '../../lib/types';

const initialState: { user: User; integrations: Integration[] } = {
	user: {
		id: '',
		token: ''
	},
	integrations: []
};

export const getUser = createAsyncThunk(
	'session/getUser',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/users/${userId}`
			);
			// const response = await axios.get(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/users/${userId}`);
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
                  const response = await axios.post(`http://localhost:8000/smartthings/token`, { token });
                  // const response = await axios.post(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/token`, { token });
                  return response.data;
            } catch (error) {
                  return rejectWithValue(error.response.data);
            }
      }
);

//GET /smartthings/{userId}/devices
export const getSmartThingsDevices = createAsyncThunk(
	'session/getSmartThingsDevices',
	async (userId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/${userId}/devices`
			);
			// const response = await axios.get(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/${userId}/devices`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// PATCH /integrations/{integrationId}
export const updateIntegration = createAsyncThunk(
	'session/updateIntegration',
	async (integration: UpdateIntegration, { rejectWithValue }) => {
		try {
			console.log('submitting');

			console.log('integration', JSON.stringify(integration));

			const response = await axios.patch(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integration/${integration.id}`,
				integration.integration
			);

			console.log('response', response.data);
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
			console.log('submitting');

			console.log('integration', JSON.stringify(integration));

			const response = await axios.post(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations`,
				integration
			);

			console.log('response', response.data._id);

			// const response = await axios.post(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations`, integration);
			const newIntegration = await axios.get(
				`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${response.data._id}`
			);
			return newIntegration.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const integrationsByUser = createAsyncThunk(
      'session/integrationsByUser',
      async (userId: string, { rejectWithValue }) => {
            try {
                  const response = await axios.get(`http://localhost:8000/integrations/${userId}`);
                  // const response = await axios.get(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/user/${userId}`);
			console.log('response', response.data)
                  return response.data;
            } catch (error) {
                  return rejectWithValue(error.response.data);
            }
      }
);

export const createDevice = createAsyncThunk(
	'session/createDevice',
	// take a device and integration id
	async (payload: any, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.patch(`http://localhost:8000/integrations/${id}`, payload);
			// const response = await axios.post(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${integrationId}`, device);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateSignal = createAsyncThunk(
	'session/updateSignal',

	async (payload: any, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.patch(`http://localhost:8000/integrations/${id}`, payload);
			// const response = await axios.post(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${integrationId}`, device);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteIntegration = createAsyncThunk(
	'session/deleteIntegration',
	async (payload: any, { rejectWithValue }) => {
		const id = payload.integrationId;
		try {
			const response = await axios.delete(`http://localhost:8000/integrations/${id}`);
			// const response = await axios.delete(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/${id}`);
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
            setUserToken: (state, action) => {
                  state.user.token = action.payload;
            },
      },
      extraReducers: (builder) => {
            builder.addCase(getUser.fulfilled, (state, action) => {
                  state.user = { id: action.payload._id, token: action.payload.token };
            });
            builder.addCase(createNewUser.fulfilled, (state, action) => {
                  state.user = { id: action.payload._id };
            });
            builder.addCase(getUser.rejected, (state) => {
                  state.user = { ...state.user }
            });
            builder.addCase(createNewUser.rejected, (state) => {
                  state.user = { ...state.user }
            });
            builder.addCase(getSmartThingsDevices.fulfilled, (state, action) => {
                  state.integrations = action.payload;
            });
            builder.addCase(getSmartThingsDevices.rejected, (state) => {
                  state.integrations = [];
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
      },
});

export const selectIntegrationByName = name => state => {
	return state.session.integrations.find(integration => integration.integrationName === name);
};


export const { setUserToken } = sessionSlice.actions;

export default sessionSlice.reducer;
