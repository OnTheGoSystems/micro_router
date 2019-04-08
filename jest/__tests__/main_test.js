'use strict';

import MicroRouter from "../../src/micro_router";
const CompiledMicroRouter = require("../../index").MicroRouter;

const testRouter = (routerClass)=> {
  const router = new routerClass();
  const View1 = { name: 'view_1' };
  const View2 = { name: 'view_2' };
  const View3 = { name: 'view_3' };

  router.setDefaultRoute('some');

  router.addRoute('some', View1);
  router.addRoute('other/:param', View2);
  router.addRoute('third/:param/:other_param', View3);

  expect(router.currentState()).toEqual({ view: View1 });

  expect(router.resolve('some')).toEqual({ view: View1 });
  expect(router.resolve('other/1')).toEqual({ view: View2, param: "1" });
  expect(router.resolve('third/good/value')).toEqual({ view: View3, param: 'good', other_param: 'value' });
};

describe('Main scenario', ()=>{
  it('routes src', ()=> {
    testRouter(MicroRouter);
  });

  it('routes compiled', ()=> {
    testRouter(CompiledMicroRouter);
  });
});
