import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
// routes
import routes, { renderRoutes } from "./routes";
// ----------------------------------------

const history = createBrowserHistory();

export default function App() {
  return <Router history={history}>{renderRoutes(routes)}</Router>;
}
