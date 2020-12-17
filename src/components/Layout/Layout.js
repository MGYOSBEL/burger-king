import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
        <Toolbar menuToggle={this.sideDrawerToggleHandler}/>
        <SideDrawer show={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
