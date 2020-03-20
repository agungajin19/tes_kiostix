import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "unistore/react";
import { store } from "../stores/MainStore";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook"

const Mainroute = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddBook} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;
