'use strict';

import MicroRouter from "../../src/micro_router";
const CompiledMicroRouter = require("../../index").MicroRouter;

const testRouter = (routerClass)=> {
  const router = new routerClass(`key${Math.random()}`, MicroRouter.modes.localStorage);
  const View1 = { name: 'view_1' };
  const View2 = { name: 'view_2' };
  const View3 = { name: 'view_3' };

  router.setDefaultRoute('some');

  router.addRoute('some', View1);
  router.addRoute('other/:param', View2);
  router.addRoute('third/:param/:other_param', View3);
  router.addRoute('another_third', View3);

  // default
  expect(router.currentState()).toEqual({ view: View1 });

  // fallback
  expect(router.resolve('some/param')).toEqual({ view: View1 });
  expect(router.resolve('notdefined')).toEqual({ view: View1 });

  // defined routes
  expect(router.resolve('some')).toEqual({ view: View1 });
  expect(router.resolve('other/1')).toEqual({ view: View2, param: "1" });
  expect(router.resolve('third/good/value')).toEqual({ view: View3, param: 'good', other_param: 'value' });
  expect(router.resolve('another_third')).toEqual({ view: View3 });

  // nagivate
  router.navigateByPath('other/123');
  expect(router.currentState()).toEqual({ view: View2, param: '123' });

  router.navigate({ view: View3, param: '1', other_param: '2' });
  expect(router.currentState()).toEqual({ view: View3, param: '1', other_param: '2' });

  router.navigateByPath('third/0/0');
  expect(router.currentState()).toEqual({ view: View3, param: '0', other_param: '0' });

  router.navigateByPath('another_third');
  expect(router.currentState()).toEqual({ view: View3, param: "undefined", other_param: "undefined"});

  router.navigate({ view: View3, param: '0', other_param: '0' });
  expect(router.currentState()).toEqual({ view: View3, param: '0', other_param: '0' });

  router.navigate({ view: View3, param: '0' });
  expect(router.currentState()).toEqual({ view: View3, param: '0', other_param: 'undefined' });

  router.navigate({ view: View3 });
  expect(router.currentState()).toEqual({ view: View3, param: 'undefined', other_param: 'undefined' });
};

describe('Main scenario', ()=>{
  it('routes src', ()=> {
    testRouter(MicroRouter);
  });

  it('routes compiled', ()=> {
    testRouter(CompiledMicroRouter);
  });
});
