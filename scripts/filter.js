!function () {
  var blacklist = new RegExp(),
      INTERVAL  = 2000 // every 2 seconds

  setInterval(function () {
    chrome.storage.sync.get('fbfilter', function (values) {
      blacklist = new RegExp(values.fbfilter, 'i')

      walk(document.body)
    })
  }, INTERVAL)

  function getPostFor(el) {
    do {
      if (hasClass(el, 'userContentWrapper')) {
        return el
      }
    } while (el = el.parentNode)
  }

  function hasClass(el, className) {
    return new RegExp(className).test(el.className)
  }

  function walk (node) {
    var child, next;

    switch (node.nodeType) {
      case 1:  // Element
      case 9:  // Document
      case 11: // Document fragment
        child = node.firstChild;
        while (child) {
          next = child.nextSibling;
          walk(child);
          child = next;
        }
        break;

      case 3: // Text node
        if (matchesBlacklist(node)) {
          hide(getPostFor(node))
        }
        break;
    }
  }

  function matchesBlacklist(node) {
    return blacklist.test(node.nodeValue);
  }

  function hide(node) {
    if (node) {
      node.style.display = 'none';
    }
  }
}()
