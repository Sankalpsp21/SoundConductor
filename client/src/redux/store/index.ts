import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sessionSlice } from "../slices/Session";

const rootReducer = combineReducers({
      session: sessionSlice.reducer,
});

const persistConfig = {
      key: "root",
      storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                  serializableCheck: false,
            }),
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;