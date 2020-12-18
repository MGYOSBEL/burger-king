import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
