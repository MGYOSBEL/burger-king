import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "./Order/Order";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let content = <Spinner />;
    if (!this.props.loading && this.props.orders) {
      const orders = this.props.orders;
      content = orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return content;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token, 
  userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
