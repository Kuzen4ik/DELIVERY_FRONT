import { useRoutes } from "react-router-dom";
import routes from "./routes";
import GlobalContextProvider from "./context/GlobalContext";
import Dashboard from "./components/layouts/Dashboard";
import AuthProvider from "./context/JWTContext";

function App() {
  const content = useRoutes(routes);

  return (
    <AuthProvider>
      <GlobalContextProvider>
        <Dashboard>{content}</Dashboard>
      </GlobalContextProvider>
    </AuthProvider>
  );
}

export default App;
