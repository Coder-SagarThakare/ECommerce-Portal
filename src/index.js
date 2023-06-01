import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { incNumber } from "./Redux/Actions/action";
import store from "./Redux/store";
import { Provider } from "react-redux";
// import { createStore } from "redux";
// import rootReducer from "./Redux/Reducers/mainReducer";

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// console.log("Combine Reducers: ", rootReducer);
// console.log("Store: ", store);
// store.dispatch(incNumber(10));
// console.log("Store:", store.getState().changeNumber.number);

const root = ReactDOM.createRoot(document.getElementById("root"));

store.subscribe(() => {
  console.log(store.getState());
});

root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId="893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
