import React, { Component } from "react";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "./Order/Order";

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((response) => {
        const orders = [];
        for (const key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({
          orders: orders,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          orders: null,
          loading: false,
        });
      });
  }

  render() {
    let content = <Spinner />;
    if (!this.state.loading && this.state.orders) {
      const orders = this.state.orders;
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

export default Orders;
