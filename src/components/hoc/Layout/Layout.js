import React, {Component}  from 'react';

import Aux from '../Aux/Aux';
import classes from './layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/NavigationItems/SideDrawer/SideDrawer';

class Layout extends Component{
  state={
    showSideDrawer: false
  }


  sideDrawerClosedHandler =()=> {
    this.setState({showSideDrawer: false});
  }

  toggleSideDrawerHandler =() => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
      <Toolbar 
      toggleSideDrawer={this.toggleSideDrawerHandler}
      />
      <SideDrawer 
        open={this.state.showSideDrawer}  
        closed={this.sideDrawerClosedHandler}/>
      <main className={classes.Content} >
        {this.props.children}
      </main>
    </Aux>
  


    )
  
  }

}

export default Layout;
