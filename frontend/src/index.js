import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './State/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
   <GoogleOAuthProvider clientId='392827722777-t657ahjv1b9c5fjn94flqc8ipqcg65ql.apps.googleusercontent.com' > 
    <Provider store={store}>
        <App />
    </Provider>
   </GoogleOAuthProvider>

);

