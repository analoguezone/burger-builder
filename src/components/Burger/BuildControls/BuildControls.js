import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const buildControls = (props)=> {

    const controls= [
      {label:'Bacon', type:'bacon'},
      {label:'Cheese', type:'cheese'},
      {label:'Meat', type:'meat'},
      {label:'Salad', type:'salad'},
    ]
  


 return (
  <div className={classes.BuildControls}>
    <p>Total price: <strong>{props.price.toFixed(2) }</strong></p>
    {/* {buildControls} */}
    {controls.map(control => 
      <BuildControl 
        key={control.label} 
        label={control.label}
        disabled={props.disabled[control.type]}
        removed= {()=>props.ingredientRemoved (control.type)}  
        added= {()=>props.ingredientAdded (control.type)} 
      />) }
      <button 
        onClick={props.ordered}
        className={classes.OrderButton} 
        disabled={!props.purchaseable }>ORDER NOW</button>
  </div>
);
};



export default buildControls;
