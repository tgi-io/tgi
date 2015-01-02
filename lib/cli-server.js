/**---------------------------------------------------------------------------------------------------------------------
 * tgi/lib/cli-server.js
 */
'use strict';

var readline = require('readline');

/**
 * command line interface
 */
module.exports = function (app) {

  /**
   * handle each line entered
   */
  var cliHandler = function (line, callback) {
    var output = '';
    switch (line.trim()) {
      case 'test':
        spec.runTests(function (msg) {
          if (msg.error) {
            console.error(msg.error);
            process.exit(1);
          } else if (msg.done) {
            console.log('Testing completed with  ...');
            console.log('testsCreated = ' + msg.testsCreated);
            console.log('testsPending = ' + msg.testsPending);
            console.log('testsFailed = ' + msg.testsFailed);
            if (msg.testsFailed || msg.testsPending) process.exit(1);
          } else if (msg.log) {
            //console.log(msg.log);
          }
        });
        break;

      case 'hello':
        output += line + '\nwhat up';
        break;

      case 'help':
        output += line + '\ni need someone';
        break;

      default:
        output += line + ' ??? type help for commands';
        break;
    }
    callback(output);
  };

  /**
   * readline will invoke cliServer with line entry
   */
  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt(': ');
  rl.prompt();
  rl.on('line', function (line) {
    cliHandler(line, function (output) {
      console.log(output);
      rl.prompt();
    });
  }).on('close', function () {
    console.log('\nBye!');
    process.exit(0);
  });

};
