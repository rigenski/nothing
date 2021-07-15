import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" exact>
          <Header />
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Fragment>
    </Router>
  );
}

export default App;
