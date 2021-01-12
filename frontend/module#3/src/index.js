import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer'
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
//TailSpin
//ThreeDots
//Rings
const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress && 
        <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="TailSpin" color="#13296e" height="100" width="100" />
    </div>
        
      );  
}

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
            </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
