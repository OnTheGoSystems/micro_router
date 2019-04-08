# MicroRouter
## Simple and minimalistic pure JS router for clientside

# Commands

## install dependencies
$ yarn

## test
$ yarn test

## build
$ yarn build

## release
$ npm publish


## Usage examples
## With window hash routing

```js
import { MicroRouter } from "@tarvit/micro_router";

// define router
const MyRouter = new MicroRouter('state_view_router_state', MicroRouter.modes.windowHash);

// draw your routes
MyRouter.setDefaultRoute('notification/example');
MyRouter.addRoute('dashboard', StateDashboard); // StateDashboard is your ReactComponent.
MyRouter.addRoute('notification/:text', StateNotification); // StateNotification is another your ReactComponent.

// create nav helpers (optinal)
MyRouter.nav = {
  toDashboard: () => {
    MyRouter.navigate({ view: StateDashboard});
  },
  toNotification: (message) => {
    MyRouter.navigate({ view: StateNotification, text: message})
  }
};


// create root component
import React, { Component } from 'react';

export default class AppRoot extends Component {
  constructor(props) {
    super(props);
    
    // enable automtical route resolving
    MyRouter.bindToWindowHash();

    // define default state
    this.state  = {
      viewState: MyRouter.currentState()
    };

    MyRouter.afterNavigate(()=>{
      this.setState({
        viewState: MyRouter.currentState()
      })
    });
  }
  
  // render corresponding component
  render() {
    const V = this.state.viewState.view;
 
    return (
      <div>
        { <V {...this.state.viewState} /> }
      </div>
    );
  }
}
```

To change router state use the folowing syntax`MyRouter.navigate({ view: StateNotification, text: message})` or `MyRouter.navigatebyPath('notification/your-text-here')`
