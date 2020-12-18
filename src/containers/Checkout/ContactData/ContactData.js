import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    }

    checkoutHandler = (event) => {
        event.preventDefault();
        console.log('ingredients: ', this.props.ingredients);
        console.log('price: ', this.props.price);

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Lele Lopez",
        address: {
          addressLine: "Sesame St. 29",
          zipCode: "08012",
          country: "Spain",
        },
        email: "elmo@gmail.com",
      },
      deliveryMethod: "urgent",
    };
    axios.post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false
        });
        this.props.history.replace('/');
        console.log(response);
      })
      .catch((err) => {
        this.setState({
          loading: false
        });
        console.log(err);
      });
    }

    render () {
        let content = (
            <div className={classes.ContactData}>
            <h4>
                Enter your contact data:
            </h4>
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street line"/>
                <input className={classes.Input} type="text" name="zipCode" placeholder="Zip Code"/>
                <Button buttonType="Success" clicked={this.checkoutHandler}>ORDER</Button>
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