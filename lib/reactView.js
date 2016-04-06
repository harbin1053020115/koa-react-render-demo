"use strict";

const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

class ReactView {
  constructor (app, config) {
    this.app = app;
    this.config = config;
  }

  render (tpl, props) {
    return new Promise((resolve, reject) => {
      let viewPath = this.config.viewPath;
      let tplPath = path.join(viewPath, tpl);

      try {
        let module = require(tplPath);
        let Factory = React.createFactory(module);
        let Component = Factory(props);

        let renderString = ReactDOMServer.renderToString(Component);

        resolve(renderString);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = function (app, config) {
  app.context.renderReact = new ReactView(app, config);
};