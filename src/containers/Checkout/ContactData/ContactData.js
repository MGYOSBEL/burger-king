import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
      },
      addressLine: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "normal", displayValue: "Normal" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  checkoutHandler = (event) => {
    event.preventDefault();
    console.log("ingredients: ", this.props.ingredients);
    console.log("price: ", this.props.price);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // customer: {
      //   name: "Lele Lopez",
      //   address: {
      //     addressLine: "Sesame St. 29",
      //     zipCode: "08012",
      //     country: "Spain",
      //   },
      //   email: "elmo@gmail.com",
      // },
      // deliveryMethod: "urgent",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.replace("/");
        console.log(response);
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        console.log(err);
      });
  };

  orderInputChangeHandler = (event, inputElementKey) => {
    const updatedOrderForm = {...this.state.orderForm};

    const updatedInputElement = {...updatedOrderForm[inputElementKey]};

    updatedInputElement.value = event.target.value;
    updatedOrderForm[inputElementKey] = updatedInputElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    let formsElementArray = [];
    for (const key in this.state.orderForm) {
      formsElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let content = (
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
        <form>
          {formsElementArray.map((formElement) => (
            <Input
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              key={formElement.id}
              changed={(event) =>
                this.orderInputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button buttonType="Success" clicked={this.checkoutHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
    if (this.state.loading) {
      content = <Spinner />;
    }
    return content;
  }
}

export default ContactData;
