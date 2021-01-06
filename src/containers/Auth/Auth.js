import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        fieldName: "email",
        value: "",
        validationRules: {
          required: true,
          isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password",
        },
        fieldName: "password",
        value: "",
        validationRules: {
          required: true,
          minLength: 8,
        },
        isValid: false,
        touched: false,
      },
    },
    formIsValid: false,
    isSignUp: false,
  };

  loginInputChangeHandler = (event, inputElementKey) => {
    const updatedLoginForm = { ...this.state.controls };

    const updatedInputElement = { ...updatedLoginForm[inputElementKey] };

    updatedInputElement.value = event.target.value;
    updatedInputElement.touched = true;
    updatedInputElement.isValid = this.checkValueAndValidity(
      updatedInputElement.value,
      updatedInputElement.validationRules
    );
    updatedLoginForm[inputElementKey] = updatedInputElement;
    let formIsValid = true;
    for (const key in updatedLoginForm) {
      formIsValid = updatedLoginForm[key].isValid && formIsValid;
    }
    this.setState({ controls: updatedLoginForm, formIsValid: formIsValid });
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
    if (!!rules.isEmail) {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  signUpHandler = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  render() {
    let formsElementArray = [];
    for (const key in this.state.controls) {
      formsElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    const errorMessage = this.props.error ? (
      <p className={classes.ErrorFeedback}>{this.props.error.message}</p>
    ) : null;

    let content = (
      <>
        <h4>{this.state.isSignUp ? `Create a new user:` : `Enter your credentials:`}</h4>
        {errorMessage}
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
                this.loginInputChangeHandler(event, formElement.id)
              }
            />
          ))}
          <Button
            disabled={!this.state.formIsValid}
            buttonType="Success"
            clicked={this.loginHandler}
          >
            SUBMIT
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.signUpHandler}>
          {this.state.isSignUp ? "Go to LOGIN page" : "Don't have an account? Go and SIGN UP"}
        </Button>
      </>
    );

    if (this.props.loading) {
      content = <Spinner />;
    }
    if (this.props.isLoggedin) {
      content = <Redirect to={this.props.redirectPath} />;
    }
    return <div className={classes.Auth}>{content}</div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isLoggedin: !!state.auth.userId,
  redirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email, password, isSignUp) =>
    dispatch(actions.login(email, password, isSignUp)),
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
