import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  SideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar menuToggle={this.sideDrawerToggleHandler} isLoggedIn={this.props.isLoggedIn}/>
        <SideDrawer isLoggedIn={this.props.isLoggedIn} show={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
