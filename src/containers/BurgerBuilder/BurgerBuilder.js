import React, { Component } from "react";
import Aux from "../../components/hoc/Aux";
//import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Burger from '../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'


class BurgerBuilder extends Component {
  // constuctor(props) {
  //   super(props);
  //   this.state={...}
  // }
  state = {
    ingredients:{
      salad: 2,
      bacon:0,
      cheese:0,
      meat:0
    }
  }

  render (){
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredients={this.state.ingredients} />
      </Aux>
    );

  }


}


export default BurgerBuilder;
