function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items)
}

function displayItems(items) {
  const elements = items.map(createHTMLString).join('')
  const container = document.querySelector('.items')
  container.innerHTML = elements
}

function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo')
  logo.addEventListener('click', () => onClickLogo(items))

  const btns = document.querySelector('.btns')
  btns.addEventListener('click', evt => onClickBtn(evt.target.dataset, items))
}

function onClickLogo(items) {
  animateClick(items)
}

function onClickBtn(dataset, items) {
  const { key, value } = dataset
  if (!key || !value) return
  const filteredItems = items.filter(item => item[key] === value)
  animateClick(filteredItems)
}

function animateClick(items) {
  const itemEl = document.querySelector('.items')
  itemEl.style.opacity = 0

  setTimeout(() => {
    displayItems(items)
    itemEl.style.opacity = 1
  }, 500)
}

loadItems()
  .then(items => {
    displayItems(items)
    setEventListeners(items)
  })
  .catch(console.log)
