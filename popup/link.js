document.querySelector('a').addEventListener('click', function(e) {
  e.preventDefault()

  chrome.tabs.create({
    url: 'chrome://extensions'
  })
})
