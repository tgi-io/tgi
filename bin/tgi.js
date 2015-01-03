#!/usr/bin/env node

'use strict';

/**
 * Node modules
 */
var tgicore = require('../node_modules/tgi-core/dist/tgi.coreUtil.js');
//var tgiutility = require('tgi-utility');
var appInit = require('../lib/app-init');
var cliServer = require('../lib/cli-server');

/**
 * Here is our App for tgi
 */
(function () {
  var tgi = {};
  //tgiutility().injectMethods(tgi);
  tgicore().injectMethods(tgi);
  var getInvalidProperties = tgi.getInvalidProperties;
  var fuck = new tgi.Model();
  var app = new tgi.Application();
  app.setInterface(new tgi.Interface());
  app.start(function () {

  });
  if (appInit(app)) {
    //console.log('tgi ' + app.version);
    if (app.startREPL) {
      cliServer();
    }
  }
}());

