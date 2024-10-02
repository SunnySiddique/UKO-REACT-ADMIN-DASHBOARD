import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthenticationProvider } from "./context/UserAuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </BrowserRouter>
  </>
);
