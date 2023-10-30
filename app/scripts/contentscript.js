chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addClass') {
    updateVideoStyles({
      left: 'unset',
      right: '0',
    });
  }
});

function updateVideoStyles(styles) {
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    for (let styleKey in styles) {
      video.style[styleKey] = styles[styleKey];
    }
  });
}

const parentElement = document.getElementById('ytp-id-17');
const targetNode = parentElement.querySelector('.ytp-panel-menu');

function findElementIndexes() {
  const children = targetNode.children;
  const indexes = {};

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const textContent = child.textContent || child.innerText;

    if (
      textContent.includes('Субтитры') ||
      textContent.includes('Subtitles/CC')
    ) {
      indexes.subtitles = i;
    }

    if (
      textContent.includes('Скорость воспроизведения') ||
      textContent.includes('Playback speed')
    ) {
      indexes.playbackSpeed = i;
    }
  }

  return indexes;
}

function handleNewChildren() {
  const children = targetNode.children;

  if (children.length >= 2) {
    observer.disconnect();
    const { subtitles, playbackSpeed } = findElementIndexes();

    const firstChild = children[subtitles];
    const secondChild = children[playbackSpeed];

    targetNode.insertBefore(secondChild, firstChild);
    targetNode.insertBefore(firstChild, secondChild.nextSibling);

    observer.observe(targetNode, { childList: true });
  }
}

const observer = new MutationObserver(function (mutations) {
  if (mutations) handleNewChildren();
});

if (targetNode) observer.observe(targetNode, { childList: true });
