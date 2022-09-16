import "./app.css";
import Layout from "./components/Layout/Layout";
import { setAuthToken } from "./helpers/setAuthToken";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return <Layout />;
}

export default App;
