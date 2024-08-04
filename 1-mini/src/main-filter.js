async function loadItems() {
  const response = await fetch('data/data.json')
  const json = await response.json()
  return json.items
}

function createElements(item) {
  const img = document.createElement('img')
  img.setAttribute('src', item.image)
  img.setAttribute('alt', item.type)
  img.setAttribute('class', 'item__thumbnail')
  const span = document.createElement('span')
  span.setAttribute('class', 'item__description')
  span.textContent = `${item.gender}, ${item.size}`
  const li = document.createElement('li')
  li.setAttribute('class', 'item')
  li.setAttribute(`data-type`, item.type)
  li.setAttribute(`data-color`, item.color)
  li.append(img, span)
  return li
}

function onClickLogo(items) {
  const itemEl = document.querySelector('.items')
  itemEl.style.opacity = 0
  setTimeout(() => {
    items.forEach(item => item.classList.remove('hide'))
    itemEl.style.opacity = 1
  }, 500)
}

function onClickBtn(dataset, items) {
  const { key, value } = dataset
  if (!key || !value) return
  animateClick(key, value, items)
}

function animateClick(key, value, items) {
  const itemEl = document.querySelector('.items')
  itemEl.style.opacity = 0

  items.forEach(item => {
    setTimeout(() => {
      item.dataset[key] !== value
        ? item.classList.add('hide')
        : item.classList.remove('hide')
      itemEl.style.opacity = 1
    }, 500)
  })
}

function bindEvents(items) {
  const logo = document.querySelector('.logo')
  logo.addEventListener('click', () => onClickLogo(items))

  const btns = document.querySelector('.btns')
  btns.addEventListener('click', evt => onClickBtn(evt.target.dataset, items))
}

loadItems()
  .then(items => {
    const elms = items.map(createElements)
    const itemsEl = document.querySelector('.items')
    itemsEl.append(...elms)
    bindEvents(elms)
  })
  .catch(console.log)
