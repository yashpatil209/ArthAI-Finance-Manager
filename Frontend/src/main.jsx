import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = "54282601059-homhe1gjvnj0nrpmtndm3o3lpfes6nkn.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <GoogleOAuthProvider clientId={clientId}>
        <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
