import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';
import { Integration, User } from '../../lib/types';

const initialState: { user: User, integrations: Integration[] } = {
      user: {
            id: '',
            token: '',
      },
      integrations: [],
}

export const getUser = createAsyncThunk(
      'session/getUser',
      async (userId: string, { rejectWithValue }) => {
            try {
                  const response = await axios.get(`http://localhost:8000/users/${userId}`);
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
                  setToken(token);

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
                  const response = await axios.get(`http://localhost:8000/smartthings/${userId}/devices`);
                  // const response = await axios.get(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/smartthings/${userId}/devices`);
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
                  const response = await axios.post(`http://localhost:8000/integrations`, integration);
                  // const response = await axios.post(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations`, integration);
                  const newIntegration = await axios.get(`http://localhost:8000/integrations/${response.data._id}`);
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
                  const response = await axios.get(`http://localhost:8000/integrations/user/${userId}`);
                  // const response = await axios.get(`https://us-central1-iconic-star-389300.cloudfunctions.net/soundconductor/integrations/user/${userId}`);
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
            setToken: (state, action) => {
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
            builder.addCase(createIntegration.fulfilled, (state, action) => {
                  state.integrations.push(action.payload);
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

export const { setToken } = sessionSlice.actions;

export default sessionSlice.reducer;