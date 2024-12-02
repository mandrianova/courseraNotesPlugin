function getTopic() {
  return document.querySelector('h1').textContent;
}

function getSubtitles() {
  const els = document.getElementsByClassName('phrases');
  const subtitles = [];
  for (let i = 0; i < els.length; i++) {
    subtitles.push(els[i].textContent);
  }
  return subtitles.join('\n');
}

function getBreadcrumb() {
  // collect items from nav aria-label="Primary breadcrumb"
  // return array of items
  const breadcrumb = document.querySelector('[aria-label="Primary breadcrumb"]');
  const items = breadcrumb.querySelectorAll('li');
  const itemsText = [];
  items.forEach(item => {
    if (item.textContent.trim() === '') return;
    itemsText.push(item.textContent.trim().replace(/\s+/g, ' '));
  });
  return itemsText;
}

export { getSubtitles, getTopic, getBreadcrumb };