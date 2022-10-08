import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./config/axios";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
import { AuthProvider } from "./context/auth-provider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
