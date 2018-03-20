import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const buildControls = (props)=> {
  
  const controls = Object.keys(props.ingredients).map((label,index)=>{
    return(
      <BuildControl 
        label={label} 
        key={index}
        className={classes.buildControls}
      />);
  });


 return (
  <div className="classes.buiildControls">
    {/* <BuildControl label={label} /> */}
    {controls}
  </div>
);
};



export default buildControls;
