var DEFAULT_VALUE = 'politic|liberal|conservative|democrat|republican|elect|capitalism|socialism|president|sanders|trump|clinton|hillary|cruz|feelthebern|obama'

var regex = document.querySelector('textarea'),
    form  = document.querySelector('form'),
    link  = document.querySelector('a')

chrome.storage.sync.get({ fbfilter: DEFAULT_VALUE }, function (values) {
  regex.value = values.fbfilter
})

form.addEventListener('submit', function(e) {
  e.preventDefault()

  chrome.storage.sync.set({
    fbfilter: regex.value
  })

  window.close();
})

link.addEventListener('click', function(e) {
  e.preventDefault()

  chrome.tabs.create({
    url: 'chrome://extensions'
  })
})
