import React, { Component } from "react";
import Aux from "../../components/hoc/Aux/Aux";
//import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES ={
  salad:0.5,
  cheese: 0.4,
  meat:1.3,
  bacon:0.7
}

class BurgerBuilder extends Component {
  // constuctor(props) {
  //   super(props);
  //   this.state={...}
  // }

 
  state = {
      ingredients: null,
      loading: false,
      totalPrice: 4,
      purchaseable:false,
      purchasing: false,
      error:false
  }

 componentDidMount () {
   axios.get('/ingredients.json')
   .then(response => {
    this.setState({ingredients: response.data});
   }).catch(error =>{
     this.setState({error:true});
   });

 }


  updatePurchaseState(ingredients){

      const sum=Object.keys(ingredients).map(igKey =>{
        return ingredients[igKey];
      }).reduce((sum,el)=>{
         return sum+el;
      },0);
      this.setState({purchaseable: sum>0})
      
  }

  addIngredientsHandler=(type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount+1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientsHandler=(type) =>{
    if (this.state.ingredients[type] ===0) return;
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount-1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type]=updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

    purchaseHandler=() =>{
      this.setState({purchasing: true});
    };

    purchaseCancelHandler =() => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
      // alert('You continue!');
      this.setState({loading: true});
      const order = {
        ingredients : this.state.ingredients,
        price: this.state.totalPrice,
        customer:{
          name: 'Peter Takacs',
          address:{
            street: 'test street',
            zipCode: '3434',
            country:'Hungary'
          },
          email: 'test@test.hu'
        },
        deiveryMethod: 'fastest'
      }
      axios.post('/orders.json',order)
      .then(response => {
        this.setState({loading: false,purchasing:false}); 

      })
      .catch(error => {
        this.setState({loading: false,purchasing:false});

      });
    }

  render (){
    const disabledInfo={
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    let orderSummary =null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientsHandler}
            disabled={disabledInfo} 
            purchaseable={this.state.purchaseable}/>
          </Aux>
      );
      orderSummary = <OrderSummary 
      totalPrice={this.state.totalPrice}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      ingredients={this.state.ingredients} />;

    };
    
    if (this.state.loading) {
      orderSummary = <Spinner/>;           
    }

   

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
          > 
          {orderSummary}
        </Modal>
        {burger}
        
      </Aux>
    );

  }


}
 

export default withErrorHandler(BurgerBuilder, axios) ;
