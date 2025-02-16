import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import "./assets/styles/main.scss";
import Notifications from "./components/Notifications";
import { HashRouter as Router } from "react-router-dom";

function App() {
  const AppRoutes = () => {
    return useRoutes(routes); // Automatically resolves nested routes
  };
  return (
    <div className="App">
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <AppRoutes />
      </Router>
      <Notifications />
    </div>
  );
}

export default App;
