import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import App from "./App.jsx";
import SsStore from "./redux/SsStore.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={SsStore}>
    <App />
  </Provider>
);
