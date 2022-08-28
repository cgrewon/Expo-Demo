import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const initialState = {};

const persistedReducer = persistReducer(persistConfig, reducers as Reducer<unknown, any>);
const store = createStore(
  persistedReducer,
  initialState as any,
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

export { store, persistor };
