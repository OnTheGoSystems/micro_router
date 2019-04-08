/*
MIT License

Copyright (c) 2019 Vitaly Tarasenko, https://github.com/tarvit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

export default class MicroRouter {
  constructor(key, mode) {
    this.key = (key || 'state_view_router_state');
    this.routes = [];
    this.callbacks = [];
    this.defaultRoute = null;
    this.mode = mode || MicroRouter.modes.windowHash;
  }

  addRoute(route, view) {
    this.routes.push({route: route, view: view})
  };

  setDefaultRoute(view) {
    this.defaultRoute = view;
  };

  currentState() {
    return this.resolve(localStorage.getItem(this.key) || this.defaultRoute);
  };

  currentWindowHashState(){
    return this.resolve(window.location.hash.replace('#', ''))
  };

  bindToWindowHash() {
    window.onhashchange = function(){
      this.navigate(this.currentWindowHashState());
    };
  };

  resolve(route){
    let currentParts = route.split('/');

    for(let i = 0; i < this.routes.length; i++) {
      let parts = this.routes[i].route.split('/');
      if(parts.length === currentParts.length) {
        let params = { view: this.routes[i].view };
        let valid = true;

        for(let j =0; j < parts.length; j++) {
          let cp = currentParts[j];
          let p = parts[j];
          if(p[0] === ':') {
            params[p.replace(':', '')] = cp;
          } else {
            if(p !== cp) {
              valid = false;
              break
            }
          }
        }
        if(valid) { return params }
      }
    }

    return this.resolve(this.defaultRoute)
  };

  navigate(viewState){
    let path = this.buildPath(viewState);
    if(this.mode === MicroRouter.modes.windowHash) window.location.hash = path;
    if(this.mode === MicroRouter.modes.localStorage) localStorage.setItem(this.key, path);
    this.runCallbacks();
  };

  navigateByPath(path){
    const resolvedState = this.resolve(path);
    this.navigate(resolvedState);
  };

  afterNavigate(callback) {
    this.callbacks.push(callback);
  }

  runCallbacks() {
    this.callbacks.forEach((callback) => {
      callback();
    });
  }

  buildPath(viewState) {
    let route = this.routeForView(viewState.view);

    let path = route.route;
    let parts = path.split('/');
    let params = parts.filter(function(e){ return e[0] === ':' }).map(function(e){return e.slice(1) });

    for(let i = 0; i < params.length; i++){
      path = path.replace(':' + params[i], viewState[params[i]])
    }

    return path;
  };

  routeForView(view){
    for(let i = 0; i < this.routes.length; i++) {
      if(this.routes[i].view === view) {
        return this.routes[i]
      }
    }
  };
};

MicroRouter.modes = {
  windowHash: "windowHash",
  localStorage: "localStorage",
};

