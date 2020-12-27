import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        fieldName: 'name',
        value: "",
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        fieldName: 'e-mail',
        value: "",
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      addressLine: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Address",
        },
        fieldName: 'address',
        value: "",
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        fieldName: 'ZIP code',
        value: "",
        validationRules: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        isValid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        fieldName: 'country',
        value: "",
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
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
        fieldName: 'delivery method',
        value: "fastest",
        validationRules: null,
        isValid: true,
      }
    },
    formIsValid: false,
  };

  checkoutHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    // dispatch the action here
    this.props.onSubmitOrder(order, this.props.token);
  };

  checkValueAndValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (!!rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (!!rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  orderInputChangeHandler = (event, inputElementKey) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedInputElement = { ...updatedOrderForm[inputElementKey] };

    updatedInputElement.value = event.target.value;
    updatedInputElement.touched = true;
    updatedInputElement.isValid = this.checkValueAndValidity(
      updatedInputElement.value,
      updatedInputElement.validationRules
    );
    updatedOrderForm[inputElementKey] = updatedInputElement;
    let formIsValid = true;
    for (const key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].isValid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

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
              fieldName={formElement.config.fieldName}
              invalid={!formElement.config.isValid}
              touched={formElement.config.touched}
              changed={(event) =>
                this.orderInputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button disabled={!this.state.formIsValid} buttonType="Success" clicked={this.checkoutHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
    if (this.props.loading) {
      content = <Spinner />;
    }
    return content;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    loading: state.purchase.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: (order, token) => dispatch(actions.purchaseBurger(order, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
