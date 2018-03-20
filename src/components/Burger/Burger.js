import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
 
  // const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
  //     return [
  //       ...Array( props.ingredients[igKey] )
  //     ].map( (_,i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey} />;
  //     });
  //   });

  const ingredientArray = Object.keys(props.ingredients);
  let transformedIngredients = ingredientArray.map((ingredient) => {
      const ingredientCount = props.ingredients[ingredient];
      const emptyArrayForIngredientComponents = Array(ingredientCount)
      const ingredientCountArrayCopy = [...emptyArrayForIngredientComponents];
      return ingredientCountArrayCopy.map( (_,i) => {
        return <BurgerIngredient key={ingredient + i} type={ingredient} />;
      });
    }).reduce((arr,el)=> {
      return arr.concat(el)
    }, []);

    
    if (!transformedIngredients.length) {transformedIngredients=<p>Please choose your ingredients </p>};
     




  return (
    <div className={classes.Burger} >
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );

};

export default burger;
