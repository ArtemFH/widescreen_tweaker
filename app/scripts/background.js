chrome.contextMenus.create({
  id: 'fixYoutube',
  title: 'Fix',
  contexts: ['page'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'fixYoutube':
      chrome.tabs.sendMessage(tab.id, { action: 'addClass' });
  }
});
