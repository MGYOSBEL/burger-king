import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "./store/actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes} 
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckAuthState: () => dispatch(actions.checkAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
