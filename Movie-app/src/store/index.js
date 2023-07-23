import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
};


const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persister = persistStore(store);

export {store, persister};

export default store;
