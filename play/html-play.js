/**---------------------------------------------------------------------------------------------------------------------
 * tgi-interface-framework7/test/html-play.js
 **/

var tgi = TGI.CORE();
var ui = TGI.ui;
var app = new tgi.Application({interface: ui});
var nav = new tgi.Presentation();

app.setInterface(ui);
app.set('brand', 'TGI Play');
app.setPresentation(nav);

/**
 * Commands
 */
var name,
  isDude,
  color;
var userQuerieCommand = new tgi.Command({
  name: 'User Queries', icon: 'fa-comments', type: 'Procedure', contents: new tgi.Procedure({
    tasks: [
      function () {
        var task = this;
        app.ask('What is first your name?', new tgi.Attribute({name: 'name'}), function (reply) {
          if (!reply)
            userQuerieCommand.abort();
          else {
            name = reply;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.yesno(name + ' are you a dude?', function (reply) {
          isDude = reply;
          task.complete();
        });
      },
      function () {
        var task = this;
        app.choose('OK ' + (isDude ? 'mr. ' : 'ms. ') + name + ', please pick a color.\nany color..\n\nplease pick one now', ['red', 'green', 'blue', 'black', 'white'], function (choice) {
          if (!choice)
            userQuerieCommand.abort();
          else {
            color = choice;
            task.complete();
          }
        });
      },
      function () {
        var task = this;
        app.ok(name + ' is a ' + color + (isDude ? ' dude.' : ' chick.') + '\n\n*** THE END ***', function () {
          task.complete();
        });
      }
    ]
  })
});
userQuerieCommand.onEvent('*', function (event) {
  if (event == 'Aborted') {
    app.info('ok fine be that way');
  }
});
// Create a function command
var funcCommand = new tgi.Command({
  name: 'Function', type: 'Function', contents: function () {
    window.alert("Hello! I am an alert box!!");
  }
});

// Create a procedure command
var procCommand = new tgi.Command({name: 'Procedure', type: 'Procedure', contents: new tgi.Procedure()});

// Stub commands
var stubMoe = new tgi.Command({name: 'Moe', description: 'Moses Horwitz', theme: 'primary', icon: 'fa-coffee'});
var stubLarry = new tgi.Command({name: 'Larry', description: 'Louis Fienberg', theme: 'info', icon: 'fa-beer'});
var stubCurly = new tgi.Command({
  name: 'Curly',
  description: 'Jerome Lester Horwitz',
  theme: 'warning',
  icon: 'fa-glass'
});

// Create sample presentation
var pres = new tgi.Presentation();
pres.set('contents', [
  '####INSTRUCTIONS\n\n' +
  'Enter some stuff then push some buttons.',
  '-',
  new tgi.Attribute({name: 'firstName', label: 'First Name', type: 'String(20)', value: 'John'}),
  new tgi.Attribute({name: 'lastName', label: 'Last Name', type: 'String(25)', value: 'Doe'}),
  new tgi.Attribute({name: 'address', label: 'Address', type: 'String(50)'}),
  new tgi.Attribute({name: 'city', label: 'City', type: 'String(35)'}),
  new tgi.Attribute({name: 'state', label: 'State', type: 'String(2)'}),
  new tgi.Attribute({name: 'zip', label: 'Zip Code', type: 'String(10)', placeHolder: '#####-####'}),
  new tgi.Attribute({name: 'birthDate', label: 'Birth Date', type: 'Date', value: new Date()}),
  new tgi.Attribute({name: 'drink', type: 'String(25)', quickPick: ['Water', 'Coke', 'Coffee']}),
  new tgi.Attribute({name: 'sex', type: 'Boolean', value: true}),
  new tgi.Attribute({name: 'drugs', type: 'Boolean', value: false}),
  new tgi.Attribute({name: 'IQ', type: 'Number', value: 100}),
  '-',
  funcCommand,
  procCommand,
  stubMoe,
  stubLarry,
  stubCurly

]);
var presCommand = new tgi.Command({name: 'Presentation', type: 'Presentation', contents: pres});
var commands = new tgi.Command({
  name: 'Commands', icon: 'fa-tasks', type: 'Menu', contents: [
    'Command Types',
    '-',
    new tgi.Command({name: 'Stub', type: 'Stub'}),
    presCommand,
    funcCommand,
    procCommand
  ]
});

/**
 * Navigation
 */
nav.set('contents', [
  new tgi.Command({
    name: 'Stooges', icon: 'fa-group', type: 'Menu', contents: [
      'The Three Stooges',
      '-',
      stubMoe,
      stubLarry,
      stubCurly
    ]
  }),
  commands,
  userQuerieCommand,
  new tgi.Command({name: 'bus', icon: 'fa-bus'}),
  new tgi.Command({name: 'plane', icon: 'fa-plane'}),
  new tgi.Command({name: 'train', icon: 'fa-train'}),
  new tgi.Command({name: 'automobile', icon: 'fa-automobile'}),
  new tgi.Command({name: 'ship', icon: 'fa-ship'}),
  new tgi.Command({name: 'bicycle', icon: 'fa-bicycle'}),
  new tgi.Command({name: 'subway', icon: 'fa-subway'}),
  '-',
  new tgi.Command({name: 'Account'})
]);

/**
 * Start the app
 */
app.start(function (request) {
  app.info('app got ' + JSON.stringify(request));
});

/**
 * Model for store test crap
 */
var Settings = function (args) {
  tgi.Model.call(this, args);
  this.modelType = "Settings";
  this.attributes.push(new tgi.Attribute({name: 'counter', type: 'Number'}));
};
Settings.prototype = Object.create(tgi.Model.prototype);

/**
 * Local Store load
 */
var ls = TGI.STORE.LOCALSTORAGE();
var localStore = new ls.LocalStore({name: 'Local Test Store'});

localStore.onConnect('http://localhost', function (store, err) {
  if (err) {
    app.info('localStore unavailable (' + err + ')');
    process.exit(1);
  } else {
    app.info(localStore.name + ' ' + localStore.storeType);

    /**
     * Find settings
     */
    var settings = new Settings();
    localStore.getList(new tgi.List(settings), [],function (list, err) {
      if (err)
        app.info('getList(new tgi.List(settings)...) error ' + err);
      if (list.moveFirst()) {
        settings.set('ID', list.get('ID'));
        settings.set('counter', list.get('counter') + 1);
      } else {
        settings.set('counter', 1);
      }
      app.info('settings counter is ' + settings.get('counter'));
      localStore.putModel(settings, function (mod, err) {
        if (err)
          app.info('putModel(settings...) error ' + err);
      });
    });


  }
}, {vendor: localStorage, keepConnection: true});

