!function () {
  var POLITICAL_POST = /sanders|trump|clinton|hillary|cruz|feelthebern|politic|liberal|conservative|democrat|republican|elect|capitalism|socialism|president|obama/i

  setInterval(function () {
    walk(document.body)
  }, 2000)

  function closestPost(el) {
    do {
      if (el.nodeName === 'DIV' && hasClass(el, 'userContentWrapper')) {
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
        if (isPolitical(node)) {
          removePost(closestPost(node));
        }
        break;
    }
  }

  function isPolitical(node) {
    return POLITICAL_POST.test(node.nodeValue);
  }

  function removePost (post) {
    if (post) {
      post.style.display = 'none';
    }
  }
}()
