// Common functions
const utils = exports
const keyCodes = require('../keycodes.local')

// adds cb as the event handler for listenerType  events on listenerEl (or window)
utils.addListener = (listenerEl, listenerType, cb) => {
  listenerEl = listenerEl || window
  listenerEl.addEventListener(listenerType, cb)
}

// replaces all underscores with whitespace
utils.stripUnderscores = (string) => {
  if (!string || typeof string !== 'string') {
    console.error('stripUnderscores requires a string: ', string)
    return ''
  }
  return string.replace(/_/g, ' ')
}

// takes a keyboard event
// returns a hashed string representing
// the key combination used
utils.hashKeyboardEvent = (keyboardEvent) => {
  // take a key object and create a nice printable string.
  let keyDisplayString = ''
  if (keyboardEvent.ctrlKey) {
    keyDisplayString += 'Ctrl+'
  }
  if (keyboardEvent.altKey) {
    keyDisplayString += 'Alt+'
  }
  if (keyboardEvent.shiftKey) {
    keyDisplayString += 'Shift+'
  }
  keyDisplayString += keyCodes[keyboardEvent.keyCode]
  return keyDisplayString
}

// turn a snake case string into a camelCase string
utils.snakeCaseToCamelCase = (string) => {
  string = utils.stripUnderscores(string)
  string = string.split(' ')
  const result = string.map(function (word, index) {
    // uppercase the first character of each word
    // except the first word
    if (index !== 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    } else {
      return word.toLowerCase()
    }
  })
  return result.join('')
}

/* globals Window Element */
// validate that a object is an Element or Window
utils.isHTMLElement = (el) => {
  if (!el instanceof Window || !el instanceof Element) {
    return false
  } else {
    return true
  }
}

// removes an element from the dom
utils.removeElFromDom = (el) => {
  el.parentNode.removeChild(el)
}
