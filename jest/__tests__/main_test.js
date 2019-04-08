'use strict';

import MicroRouter from "../../src/micro_router";
const CompiledMicroRouter = require("../../index").MicroRouter;

const testRouter = (routerClass)=> {
  const router = new routerClass();
  const View1 = {name: 'view_1'};
  const View2 = {name: 'view_2'};
  const View3 = {name: 'view_3'};

  router.addRoute('some', View1);
  router.addRoute('other/:param', View2);
  router.addRoute('third/:param/:other_param', View3);
};

describe('Main scenario', ()=>{
  it('routes src', ()=> {
    testRouter(MicroRouter);
  });

  it('routes compiled', ()=> {
    testRouter(CompiledMicroRouter);
  });
});
