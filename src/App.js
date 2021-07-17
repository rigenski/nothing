import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import NotFound from "./containers/NotFound";
import * as Middleware from "./middleware";
import { Provider } from "react-redux";
import { store } from "./config/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route path="/" exact>
            <Middleware.Authentication render={<Header />} />
            <Middleware.Authentication render={<Home />} />
          </Route>
          <Route path="/register">
            <Middleware.Guest render={<Register />} />
          </Route>
          <Route path="/login">
            <Middleware.Guest render={<Login />} />
          </Route>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
