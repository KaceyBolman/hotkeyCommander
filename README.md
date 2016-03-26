# Hotkey Commander
> A drop in javascript module for configuring hotkeys.
> This module uses the HTML import spec for templating, which is currently (and sadly) only  supported by chrome. Polyfills or other template options may be added later. This project is still in development and not yet in a usable state.

#### TODO
- Protect against existing hotkeys.
- Load hotkeys to and from local storage.
- Catch/use alt keys (shift/ctrl/alt)
- Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.
- Add categories (so that keys can be sorted by category)

### Usage
- Setup initial hotkeys map in the hotkeys.js file.
- Include the hotkeyCommander.js, and the hotkeys.js script in your main html file. 
- Pass the hotkeys map, and the element to attach the config html to.

```html
  <div id="hotkeys"></div>
  <script src="hotkeys.js"></script>
  <script src="hotkeyCommander.js"></script>

  <script>
    var targetEl = document.getElementById('hotkeys');
    hotkeyCommander.init(HKC_hotkeysMap, targetEl);
  </script>

```


