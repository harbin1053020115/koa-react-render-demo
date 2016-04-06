"use strict";

const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const ReactView = require('./lib/reactView');

require("babel-core/register")({
  presets: ['react', 'stage-0']
});

const App = () => {
  let app = Koa();
  let router = KoaRouter();

  router.get('/', function* () {
    this.body = yield this.renderReact.render('index', {
      title: 'test title'
    });
  });

  ReactView(app, {
    viewPath: path.join(process.cwd(), 'views')
  });

  app.use(router.routes());

  return app;
};

const createApp = () => {
  const app = App();

  app.listen(3000, () => {
    console.log('Listening on http://127.0.0.1:3000');
  });

  return app;
};

createApp();