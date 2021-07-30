import { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import * as Middleware from "./middleware";
import { Provider } from "react-redux";
import { store } from "./config/redux/store";
import Footer from "./components/Footer";

const Routing = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Fragment>
      <Header auth={true} />
      <Route path="/" exact>
        <Home />
        {/* <Footer /> */}
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Fragment>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;
