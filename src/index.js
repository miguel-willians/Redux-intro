import React from "react";
import ReactDOM from "react-dom/client";
// Para conectar o react com o redux, é necessárion instalar o pacote react-redux com o npm. O funcionamento do Provider é semelhante ao provider da Context API
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

import store from "./store";

store.dispatch({ type: "account/deposit", payload: 250 });
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
