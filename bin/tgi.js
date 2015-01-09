#!/usr/bin/env node

'use strict';

/**
 * Node modules
 */
var tgicore = require('../node_modules/tgi-core/dist/tgi.core.js');
var appInit = require('../lib/app-init');
var cliServer = require('../lib/cli-server');

/**
 * Here is our App for tgi
 */
var tgi = tgicore();
var ui = new tgi.Interface();
var app = new tgi.Application();
app.setInterface(ui);
app.start(function (shizzle) {
  //console.log(JSON.stringify(shizzle));
});
if (appInit(app)) {
  if (app.startREPL) {
    cliServer();
  }
}

var cmd = new tgi.Command(function () {
  console.log('here be cmd');
});
ui.mockRequest(new tgi.Request({type: 'Command', command: cmd}));

