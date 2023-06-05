import { useRoutes } from "react-router-dom";
import routes from "./routes";
import GlobalContextProvider from "./context/GlobalContext";
import Dashboard from "./components/layouts/Dashboard";

function App() {
  const content = useRoutes(routes);

  return (
    <GlobalContextProvider>
      <Dashboard>{content}</Dashboard>
    </GlobalContextProvider>
  );
}

export default App;
