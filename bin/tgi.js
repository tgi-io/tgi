#!/usr/bin/env node

'use strict';

/**
 * Node modules
 */
var tgicore = require('tgi-core');
var appInit = require('../lib/app-init');
var cliServer = require('../lib/cli-server');

/**
 * Here is our App for tgi
 */
var app = {};
if (appInit(app)) {
  //console.log('tgi ' + app.version);
  if (app.startREPL) {
    cliServer();
  }
}
