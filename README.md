[![Stories in Ready](https://badge.waffle.io/recursion/hotkeyCommander.png?label=ready&title=Ready)](https://waffle.io/recursion/hotkeyCommander)

# Hotkey Commander

> A 'drop in' javascript module for consuming keyboard events with super-easy, user-level configuration.

- **Easy to use:**
    - As a developer, you simply define an object with your event handlers, and a list of hotkey definitions, and pass them to your instance of hotkeyCommander. The module handles everything else from there.
    - Your users can easily configure their hotkey preferences, and your application will instantly respond to their new preferences.
    - Display the configuration pane with hotkeyCommanders built in rendering engine, ~~or pass the job off to react, or your view rendering framework/library of choice.~~ *coming soon*

- **Can run from multiple contexts:** Engineered from the start to work in a 'multi-context' chrome extension situation, where hotkey configuration runs in a completely seperate browser context than the hotkey event consumption engine - _hotkeyCommander will of course work just as easily in a single browser context._

> This module is still under development, and not ready for production use. It is coming along rapidly however.

###### Contributing
- Pull requests are welcomed.
- Project uses [standard](http://standardjs.com/index.html) for all styling requirements. No fuss. No muss.
- Please use git issues from communications/feature requests/bug reports. Or jump on the [waffle](https://waffle.io/recursion/hotkeyCommander) to see our issues the way we do.

# Usage

#### Overview

1. Create your list of custom hotkey definitions. *see below for details*
2. Add hotkeyCommander to your project.
    - ~~`npm install --save hotkey-commander`~~  *-not yet implemented*
    - or
    - clone the repo and build hotkeyCommander.js
        1. git clone ........
        1. run `npm run build` or `webpack` from the cloned repo to build
        2. copy dist/hotkeyCommander.js to your project as needed
3. Create an instance of hotkeyCommander
    - `const hotkeyCommander = require('path/to/hotkeyCommander.js')`
    - or in your html file: `<script src="path/to/hotkeyCommander.js"></script>`
3. Pass hotkeyCommander:
    1. A hotkey definition list
    2. An object with *your* eventhandler methods, which follows the hotkeyCommander hotkey naming pattern
    3. the HTML Elements to:
        - render configuration on
        - consume user key events from
#### Load as a script from html or as a node module.

##### As browser script
> - `npm run build` to get the bundle file to the project dist directory
> - move the files in dist to where you want to serve them, or serve from there..
> - Setup initial hotkeys map in the hotkeys.js file.
> - Include the hotkeyCommander.js script in your main html file.
> - Call init on it with the desired container element (this is where you want your config panel to render)

```html
  <div id="hotkeys"></div>
  <script src="dist/hotkeyCommander.js"></script>

  <script>
    var hotkeys = require('./myHotkeyDefaults')
    var targetEl = document.getElementById('hotkeys');
    hotkeyCommander.init(targetEl, {hotkeys: hotkeys});
  </script>
```

##### As a node module
> The config portion will run in the plugin context
> while the  hotkey engine will run in the extensions target window.
> Better instructions coming, but to give you an idea, it will look something like this:

```js
// in the context/file where you will be providing user configuration
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startConfigurator(targetElement, listenerElement, {hotkeys})

// then in the context where you want the keykeys to be responded to:
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startEngine(listenerElement, responderObject, {hotkeys})
```
----

### Creating hotkey definitions:

Creating hotkey definitions is a mostly simple concept. Ultimately its an array of objects which describe hotkeys, grouped by category. Its important to note that there are some important naming conventions that must be followed here in order for hotkeyCommander to work. Let me lay out the pieces here:

---

###### Naming Conventions:
> Your eventhandler's method names, and your hotkey definitions must use the same name __except__:

  - __hotkey definitions__ use all caps and underscores
      - ex: `YOUR_HOTKEY_DESCRIPTION`
  - __eventhandler method names__ use traditional camel case
      - ex `yourHotkeyDescription`

###### HOTKEY OBJECT
> Represents a hotkey

```js
{
  name: YOUR_EVENTHANDLER_NAME_WITH_ALL_CAPS_AND_UNDERSCORES,
  keyCode: ASCII_KEYCODE,
  altKey: BOOL,
  ctrlKey: BOOL,
  shiftKey: BOOL
}
```
###### HOTKEY CATEGORY OBJECT
> A category of hotkeys

```js
{
  name: YOUR_CATEGORY_NAME,
  keys: [
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject}
  ]
}
```
###### HOTKEY LIST
> An array of hotkey category objects:

```js
[
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject}
]
```
###### HOTKEY.DEFAULTS.JS EXAMPLE
```js
// hotkey.defaults.js
[
  {
    name: 'MOVEMENT_KEYS',
    keys: [
      {
        name: 'FORWARD',
        keyCode: 87, // w
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      },
      {
        name: 'BACK',
        keyCode: 83, // s
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  },
  {
    name: 'UI_KEYS',
    keys: [
      {
        name: 'SHOW_MAP',
        keyCode: 77, // m
        altKey: false,
        ctrlKey: true,
        shiftKey: false
      },
      {
        name: 'OPEN_CHAT',
        keyCode: 84, // t
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  }
]
```

#### TODO
- Load hotkeys to and from local storage (google.storage.sync for chrome extensions).
- Catch/use alt keys (shift/ctrl/alt)
- Convert to a more universal templating solution.
- Make the module easily usable in other frameworks (react/angular/webcomponents?)
- Convert to a redux store
- ~~Protect against overwriting existing hotkeys.~~
- ~~Add categories (so that keys can be sorted by category)~~
- ~~Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.~~


