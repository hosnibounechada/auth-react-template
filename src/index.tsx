import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./config/axios";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
import { AuthProvider } from "./context/auth-provider";
import { MessagesProvider } from "./context/messages-provider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <AuthProvider>
      <MessagesProvider>
        <App />
      </MessagesProvider>
    </AuthProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
