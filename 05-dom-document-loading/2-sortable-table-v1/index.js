export default class SortableTable {
  constructor(headerConfig = [], data = []) {

    this.headerConfig = headerConfig
    this.data = data

    this.element = this.getElement(this.headerConfig, this.data)
  }

  getElement(headerConfig, data) {
    const element = document.createElement('div')
    const table = document.createElement('div')

    element.classList.add('products-list__container')
    element.setAttribute('data-element', 'productsContainer')

    table.classList.add('sortable-table')

    table.append(this.createHeaderElement(headerConfig))
    table.append(this.createBodyElement(data, headerConfig))
    table.append(this.createLoadingElement())
    table.append(this.createEmptyPlaceholderElement())

    element.append(table)

    return element
  }

  createHeaderElement(headerConfig) {
    const header = document.createElement('div')

    header.classList.add('sortable-table__header', 'sortable-table__row')
    header.setAttribute('data-element', 'header')

    for (const column of headerConfig) {
      header.append(this.createHeaderCell(column))
    }

    return header
  }

  createHeaderCell(column) {
    const cell = document.createElement('div')

    cell.classList.add('sortable-table__cell')
    cell.setAttribute('data-id', column.id)
    cell.setAttribute('data-sortable', column.sortable)

    cell.innerHTML = `<span>${column.title}</span>`

    return cell
  }

  createBodyElement(data, headerConfig) {
    const body = document.createElement('div')

    body.classList.add('sortable-table__body')
    body.setAttribute('data-element', 'body')

    for (const product of data) {
      body.append(this.createProductRowElement(product, headerConfig))
    }

    return body
  }

  get subElements() {
    const dataElements = this.element.querySelectorAll('[data-element]')
    let subElements = {}

    for (const element of dataElements) {
      subElements[element.getAttribute('data-element')] = element
    }

    return subElements
  }

  createProductRowElement(product, headerConfig) {
    const row = document.createElement('a')

    row.setAttribute('href', `/products/${product.id}`)
    row.classList.add('sortable-table__row')

    for (const column of headerConfig) {
      const cell = document.createElement('div')
      cell.classList.add('sortable-table__cell')
      cell.innerHTML = product[column.id]

      if (column.title === 'Image') {
        cell.innerHTML = this.getImageTemplate(product.images[0].url)
      }

      row.append(cell)
    }

    return row
  }

  createArrowElement() {
    const arrowElement = document.createElement('span')
    arrowElement.classList.add('sortable-table__sort-arrow')
    arrowElement.setAttribute('data-element', 'arrow')
    arrowElement.innerHTML = '<span class="sort-arrow"></span>'

    return arrowElement
  }

  getImageTemplate(url) {
    return `<img class="sortable-table-image" alt="Image" src="${url}">`
  }

  createLoadingElement() {
    const loading = document.createElement('div')

    loading.setAttribute('data-element', 'loading')
    loading.classList.add('loading-line', 'sortable-table__loading-line')

    return loading
  }

  createEmptyPlaceholderElement() {
    const emptyPlaceholderElement = document.createElement('div')

    emptyPlaceholderElement.setAttribute('data-element', 'emptyPlaceholder')
    emptyPlaceholderElement.classList.add('sortable-table__empty-placeholder')
    emptyPlaceholderElement.innerHTML = `<div>
      <p>No products satisfies your filter criteria</p>
      <button type="button" class="button-primary-outline">Reset all filters</button>
    </div>`

    return emptyPlaceholderElement
  }

  clearDataOrderAttribure(elements) {
    for (const element of elements) {
      element.querySelector('[data-element="arrow"]').remove()
      element.removeAttribute('data-order')
    }
  }

  sort(fieldValue, orderValue) {
    this.clearDataOrderAttribure(this.element.querySelectorAll('.sortable-table__cell[data-order]'))

    const sortedColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`)
    sortedColumn.setAttribute('data-order', orderValue)
    sortedColumn.append(this.createArrowElement())

    const sortedData = this.data.sort((a, b) => {
      const order = orderValue === 'asc' ? 1 : -1

      if (fieldValue === 'date') {
        return (Date.parse(a[fieldValue]) - Date.parse(b[fieldValue])) * order
      }

      if (isNaN(Number(a[fieldValue]))) {
        const locales = ['ru', 'en']
        const options = {
          sensitivity: 'variant',
          caseFirst: 'upper',
        }
        
        return a[fieldValue].localeCompare(b[fieldValue], locales, options) * order
      }
      
      
      return (a[fieldValue] - b[fieldValue]) * order
    })

    const body = this.element.querySelector('[data-element="body"]')
    body.innerHTML = null

    for (const product of sortedData) {
      body.append(this.createProductRowElement(product, this.headerConfig))
    }
  }

  destroy() {
    this.remove()
  }

  remove() {
    this.element.remove()
  }
}
