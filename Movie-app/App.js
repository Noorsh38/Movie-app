
import React from 'react';
import RootNavigator from './src/RootNavigator';
import { Provider } from 'react-redux';
import { store, persister } from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import './config/firebase'
// import { getAuth } from 'firebase/auth';
// const auth = getAuth()
// console.log(auth, 'auth')
const App = () => {

  return (
    <>
      <PersistGate loading={null} persistor={persister}>
        <Provider {...{ store }}>
          <RootNavigator />
        </Provider>
      </PersistGate>
    </>
  );
}


export default App;
