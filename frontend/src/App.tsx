import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
// routes
import routes, { renderRoutes } from "routes";
import { AuthProvider } from "guards/authProvider";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// ----------------------------------------

const history = createBrowserHistory();

export default function App() {
  axios.defaults.baseURL = process.env.PUBLIC_API || "http://localhost:4000";

  return (
    <Router history={history}>
      <ToastContainer />
      <AuthProvider>{renderRoutes(routes)}</AuthProvider>
    </Router>
  );
}
