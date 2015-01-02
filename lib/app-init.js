/**---------------------------------------------------------------------------------------------------------------------
 * tgi/lib/app-init.js
 */
'use strict';

/**
 * tgi app init
 */
module.exports = function (app) {
  var i;
  var retCode = true;

  /**
   * read package.json info
   */
  var cliPackage = require('../package');
  app.version = cliPackage.version;

  /**
   * deal with command line args
   */
  var args = process.argv.slice(2);
  app.commands = [];
  app.startREPL = args.length === 0;
  for (i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg.substring(0, 1) == '-') {
      switch (arg) {
        case '-?':
        case '-h':
          console.log('\nUsage: tgi [commands] [options]\n\n' +
          'Options:\n' +
          ' -h command line help\n' +
          ' -r starts a REPL -- default if no arguments .e.g. tgi (return)\n' +
          ' -v version info\n');
          break;

        case '-r':
          app.startREPL = true;
          break;

        case '-v':
          console.log('tgi ' + app.version);
          break;

        default:
          console.log('  unknown option `' + arg + '`');
          break;
      }
    } else {
      console.log('command ' + arg);
    }
  }
  return retCode;
};
