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
MyRouter.addRoute('dashboard', StateDashboard);
MyRouter.addRoute('notification/:text', StateNotification);

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




## With window hash routing

```
import { MicroRouter } from "@tarvit/micro_router";

// define router
const MyRouter = new MicroRouter('state_view_router_state', MicroRouter.modes.windowHash);
// Alternatively you can build localstorage router. => new MicroRouter('state_view_router_state', MicroRouter.modes.localStorage); 

// draw your routes
MyRouter.setDefaultRoute('notification/example');
MyRouter.addRoute('dashboard', StateDashboard);
MyRouter.addRoute('notification/:text', StateNotification);

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

    // enable automtical route resolving, require for MicroRouter.modes.windowHash only.
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
