import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Home from "./../containers/Home";
import Login from "./../containers/Login";
import Register from "./../containers/Register";
import * as Middleware from "./../middleware/";

function Router(props) {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Route path="/" exact>
          <Middleware.Authentication render={<Home />} />
          <Footer />
        </Route>
        <Route path="/register">
          <Middleware.Guest render={<Register />} />
        </Route>
        <Route path="/login">
          <Middleware.Guest render={<Login />} />
        </Route>
      </BrowserRouter>
    </Fragment>
  );
}

export default Router;
