import React, {Component} from 'react';
import Aux from './../../hoc/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
  // this could be a functional componernt doesnt have to be a class
  
  componentDidUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  
  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
      return <li key={igKey}>
          <span style={{textTransform: 'capitalize'}} >
            {igKey}</span>: {this.props.ingredients[igKey]}
        </li>
    });
  

    return(
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger wit the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: </strong>{this.props.totalPrice.toFixed(2)} </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelled} >CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
    </Aux>
    )
  }
};


export default OrderSummary;
