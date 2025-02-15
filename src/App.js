import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import "./assets/styles/main.scss";
import Notifications from "./components/Notifications";
function App() {
  const AppRoutes = () => {
    return useRoutes(routes); // Automatically resolves nested routes
  };
  return (
    <div className="App">
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <AppRoutes />
      </BrowserRouter>
      <Notifications />
    </div>
  );
}

export default App;
